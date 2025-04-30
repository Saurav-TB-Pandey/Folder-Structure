import axios from "axios";
import config from "../config";
import toast from "react-hot-toast";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../utils/common";
import { decrypt, encrypt } from "../utils/cryptography";

const { API_BASE_URL, ENVIRONMENT, ALLOWED_ENVIRONMENTS } = config;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Function to get a new access token using Client Credentials
const fetchAccessToken = async () => {
  try {
    const apiPath = `${API_BASE_URL}/auth/access-token`;
    const response = await axios.get(apiPath);

    const decryptedResponse = ALLOWED_ENVIRONMENTS?.includes(ENVIRONMENT)
      ? response.data.data
      : decrypt(response.data.data);
    response.data.data = decryptedResponse;

    const token = response.data?.data?.token;

    setToLocalStorage("authToken", token);
    return token;
  } catch (error) {
    console.error("Failed to get access token", error);
    toast.error("Authentication failed. Please try again.");
    return null;
  }
};

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    let token = getFromLocalStorage("authToken");

    if (!token) {
      token = await fetchAccessToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    if (config.data && typeof config.data === "object") {
      config.data = {
        payload: ALLOWED_ENVIRONMENTS?.includes(ENVIRONMENT)
          ? config.data
          : encrypt(config.data),
      };
    }

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(new Error(error.message || "Request failed"));
  }
);

// Response Interceptor for Token Expiry Handling
apiClient.interceptors.response.use(
  (response) => {
    try {
      // If response has encrypted data field, decrypt it
      if (
        response?.data?.data &&
        typeof response.data.data === "string" &&
        !ALLOWED_ENVIRONMENTS?.includes(ENVIRONMENT)
      ) {
        const decrypted = decrypt(response.data.data);
        response.data.data = decrypted;
      }

      const toastSuccessMessages = ["Appointment scheduled successfully"];

      const successMessage = response?.data?.message ?? "Success";

      if (toastSuccessMessages.includes(successMessage)) {
        toast.success(successMessage);
      }
    } catch (error) {
      console.error("Failed to decrypt response:", error);
      toast.error("Failed to decrypt server response");
    }

    return response;
  },

  async (error) => {
    if (error.response && error.response.status === 401) {
      removeFromLocalStorage("authToken");
      const newToken = await fetchAccessToken(); // Get new token

      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config); // Retry the failed request with new token
      } else {
        toast.error("Session expired. Redirecting to login...");
        window.location.href = "/checkin";
      }
    } else {
      // If response has encrypted data field, decrypt it
      if (
        error?.response?.data?.data &&
        typeof error?.response.data.data === "string" &&
        !ALLOWED_ENVIRONMENTS?.includes(ENVIRONMENT)
      ) {
        const decrypted = decrypt(error?.response.data.data);
        error.response.data.data = decrypted;
      }

      const toastErrorMessages = ["No Appointments Found"];

      const errorMessage =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong";

      if (!toastErrorMessages.includes(errorMessage)) {
        toast.error(errorMessage);
      }
    }

    interface ExtendedError extends Error {
      data?: string;
    }

    const err: ExtendedError = new Error(error.message ?? "Response failed");

    if (error?.response?.data?.data) {
      err.data = error.response.data.data;
    }

    return Promise.reject(err);
  }
);

export { apiClient };

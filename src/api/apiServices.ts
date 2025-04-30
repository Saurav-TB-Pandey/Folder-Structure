import { apiClient } from ".";

export const getData = async (path: string) => {
  try {
    const response = await apiClient.get(path);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postData = async (path: string, data: unknown) => {
  try {
    const response = await apiClient.post(path, data);
    return response.data;
  } catch (error: any) {
    console.error("Error posting data:", error.response?.data || error.message);
    throw error;
  }
};

export const putData = async (path: string, data: unknown) => {
  try {
    const response = await apiClient.put(path, data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteData = async (path: string) => {
  try {
    const response = await apiClient.delete(path);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

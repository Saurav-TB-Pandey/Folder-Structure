import { Toaster } from "react-hot-toast";

const HotToaster = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options for all toasts
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
          padding: "13px",
          borderRadius: "8px",
          fontSize: "14px",
        },
        // Customize specific toast types
        success: {
          duration: 3000,
          style: {
            background: "#008000",
            color: "#ffffff",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#008000",
          },
        },
        error: {
          duration: 3000,
          style: {
            background: "#FF4B4B",
            color: "#ffffff",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#FF4B4B",
          },
        },

        loading: {
          style: {
            background: "#fff",
            color: "#363636",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#FF4B4B",
          },
        },
      }}
    />
  );
};

export default HotToaster;

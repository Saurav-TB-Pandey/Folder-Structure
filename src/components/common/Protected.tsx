import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { documentTitle } from "../../utils/common";

interface ProtectedProps {
  isProtected: boolean;
  children: React.JSX.Element;
}

const Protected: React.FC<ProtectedProps> = ({ isProtected, children }) => {
  const currentPath = location.pathname;
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    document.title = `IntellComm | ${
      documentTitle[currentPath] ? documentTitle[currentPath] : ""
    }`;
  }, [currentPath]);

  if (!isAuthenticated && isProtected) {
    return <Navigate to="/" />;
  } else if (isAuthenticated && currentPath === "/") {
    return <Navigate to="/dashboard" />;
  }
  // else if (currentPath === "/") {
  //   return <Navigate to="/checkin" />;
  // }

  return children;
};

export default Protected;

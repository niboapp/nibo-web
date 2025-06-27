import { Navigate } from "react-router-dom";
import { authService } from "../api/auth";

const RootRedirect = () => {
  const isAuthenticated = authService.getToken();

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  // If authenticated, redirect to stores page (or dashboard if they're a manufacturer)
  return <Navigate to="/myproducts" replace />;
};

export default RootRedirect;

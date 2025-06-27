import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../api/auth";

const ProtectedRoute = () => {
  const isAuthenticated = authService.getToken();

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

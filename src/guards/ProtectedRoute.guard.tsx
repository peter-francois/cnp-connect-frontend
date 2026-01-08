import { Navigate, Outlet } from "react-router";
import { useAuthService } from "../hooks/useAuthService";

const ProtectedRoute = () => {
  const { me } = useAuthService();
  const { isError, isLoading, data: user } = me();

  if (isLoading) return null;

  if (isError || !user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

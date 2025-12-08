import { Navigate, Outlet } from "react-router";
import { useAuthService } from "../hooks/useAuthService";
import { UserRolesEnum } from "../types/enum/UserEnum";
import { menuLinks } from "../utils/links";

const SupervisorRoute = () => {
  const { me } = useAuthService();
  const { isLoading, data: user } = me();

  if (isLoading) return null;

  if (user?.role !== UserRolesEnum.SUPERVISOR) {
    // @dev après ce sera sur dashbord
    return <Navigate to={menuLinks.items.users.path} replace />;
  }
  return <Outlet />;
};

export default SupervisorRoute;

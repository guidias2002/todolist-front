import { Navigate, Outlet } from "react-router-dom";
import { paths } from "./shared/paths";
import { useAuth } from "./providers/AuthProvider";

function PrivateRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={paths.LOGIN} />;
  }

  return <Outlet />;
}

export default PrivateRoute;

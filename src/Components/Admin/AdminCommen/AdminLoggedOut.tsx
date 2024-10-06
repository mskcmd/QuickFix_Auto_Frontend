import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";

const AdminLoggedOut = () => {
  const adminData = useAppSelector((state) => state.auth.adminData);

  if (!adminData) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/dashboard/dashboard" />;
  }
};

export default AdminLoggedOut;

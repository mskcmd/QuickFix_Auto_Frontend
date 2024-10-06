import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";

const AdminProtucter = () => {
  const adminData = useAppSelector((state) => state.auth.adminData);
  
  if (adminData) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

export default AdminProtucter;

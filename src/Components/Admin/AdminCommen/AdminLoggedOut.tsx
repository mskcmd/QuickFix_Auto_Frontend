import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";

const AdminLoggedOut = () => {
  // Accessing adminData from the state
  const adminData = useAppSelector((state) => state.auth.adminData);
console.log("hjgsd",adminData);

  // Checking if adminData exists and if it has the 'data' property
  if (!adminData) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/dashboard/dashboard" />;
  }
};

export default AdminLoggedOut;

import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";

const AdminProtucter = () => {
  // Accessing adminData from the state
  const adminData = useAppSelector((state) => state.auth.adminData);
  console.log("login mid",adminData);
  
  // Checking if adminData exists and if it has the 'data' property
  if (adminData) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

export default AdminProtucter;

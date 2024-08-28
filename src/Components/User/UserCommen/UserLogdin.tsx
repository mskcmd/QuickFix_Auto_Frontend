import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";

const UserLogdin = () => {
  const userData = useAppSelector((state) => state.auth.userData);
  console.log("jd", userData);

  if (userData?.data.isUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserLogdin;

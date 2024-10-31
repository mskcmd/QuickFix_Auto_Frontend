import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import { useEffect, useState } from "react";
import { getProfile } from "../../../Api/user";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userLogout } from "../../../app/slice/AuthSlice";

const UserLogdin = () => {
  const userData = useAppSelector((state) => state.auth.userData);
  const [data, setData] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProfile();

        if (result?.data.isBlocked) {
          setData(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (data) {
    dispatch(userLogout());
    toast.error("User Blocked by the admin!");
    return <Navigate to="/login" />;
  }
  return userData ? <Outlet /> : <Navigate to="/login" />;
};

export default UserLogdin;

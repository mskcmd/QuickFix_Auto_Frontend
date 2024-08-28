import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import { getmechData } from "../../../Api/mechanic";
// import { showCustomToast } from "../../../Components/Common/Tost/Tost";

// Define the type for a single item in the mechanic data
export type MechanicDataItem = {
  isCompleted: boolean;
  email: string;
  isBlocked: boolean;
  isMechanic: boolean;
  isSubscriber: boolean;
  isVerified: boolean;
  mechanicdataID: string;
  name: string;
  password: string;
  phone: string;
  __v: number;
  _id: string;
};

const MechanicLoggedin: React.FC = () => {
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          const result: MechanicDataItem[] = await getmechData(
            mechanicData.mechnicId
          );
          console.log("Fetched mechanic data:", result[0]?.isCompleted);

          // if (result.length > 0 && !result[0].isCompleted) {
          //   showCustomToast();
          //   navigate("/mechanic/register");
          // }
        } catch (error) {
          console.error("Failed to fetch mechanic data:", error);
        }
      }
    };

    fetchMechanicData();
  }, [mechanicData, navigate]);

  if (mechanicData) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default MechanicLoggedin;

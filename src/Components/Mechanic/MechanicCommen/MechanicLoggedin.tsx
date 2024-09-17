import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import { getmechData } from "../../../Api/mechanic";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import RegisterOne from "../../../Pages/mechanic/RegisterOne";

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
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          const result: MechanicDataItem[] = await getmechData(mechanicData.mechnicId);
          if (result.length > 0) {
            setIsCompleted(result[0].isCompleted);
            // If the profile is incomplete, show a toast
            if (!result[0].isCompleted) {
              toast.warning("Please complete your profile before proceeding.");
            }
          }
        } catch (error) {
          console.error("Failed to fetch mechanic data:", error);
        }
      }
    };

    fetchMechanicData();
  }, [mechanicData]);

  // If mechanicData is not available, navigate to the home page
  if (!mechanicData) {
    return <Navigate to="/" />;
  }

  // If isCompleted is false, render RegisterOne component and show the toast
  if (isCompleted === false) {
    return (
      <>
        <RegisterOne />
      </>
    );
  }

  // If the mechanic data exists and isCompleted is true, render Outlet for child routes
  return <Outlet />;
};

export default MechanicLoggedin;

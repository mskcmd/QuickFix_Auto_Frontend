import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import { getmechData } from "../../../Api/mechanic";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import RegisterOne from "../../../Pages/mechanic/RegisterOne";
import toast from "react-hot-toast";

// Define the type for a single item in the mechanic data
export type MechanicDataItem = {
  append(arg0: string, profileImage: (arg0: string, profileImage: any) => unknown): unknown;
  profileImage(arg0: string, profileImage: any): unknown;
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
          const result: MechanicDataItem[] = await getmechData(
            mechanicData.mechnicId
          );
          if (result.length > 0) {
            setIsCompleted(result[0].isCompleted);
            if (!result[0].isCompleted) {
              toast("Please complete your profile before proceeding.", {
                icon: "⚠️", 
                duration: 2000, 
                style: {
                  border: "1px solid #FFA500",
                  padding: "16px",
                  color: "#FFA500",
                },
              });
            }
          }
        } catch (error) {
          console.error("Failed to fetch mechanic data:", error);
        }
      }
    };

    fetchMechanicData();
  }, [mechanicData]);

  if (!mechanicData) {
    return <Navigate to="/" />;
  }

  if (isCompleted === false) {
    return (
      <>
        <RegisterOne />
      </>
    );
  }

  return <Outlet />;
};

export default MechanicLoggedin;

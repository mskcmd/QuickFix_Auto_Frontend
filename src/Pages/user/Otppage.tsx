import React, { useEffect, useState } from "react";
import { resendOtp, verifyOtp } from "../../Api/user";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../app/slice/AuthSlice";
import { useAppSelector } from "../../app/store";
import { toast } from "react-toastify";

interface OTPComponentProps {}

const OTPComponent: React.FC<OTPComponentProps> = () => {
  const navigate = useNavigate();

  const [otp, setOTP] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(30);
  const [isOtpExpired, setIsOtpExpired] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state variable

  const userData: UserData | null = useAppSelector(
    (state) => state.auth.userData
  );

  useEffect(() => {
    if (userData) navigate("/home");
  }, [navigate, userData]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setIsOtpExpired(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOTP(e.target.value);
  };

  const handleVerify = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      console.log(otp);
      const result = await verifyOtp(otp);
      console.log("Resultq:", result);
      console.log("pppp:", result?.data.Isexpired);
      console.log("sdfds", result?.data.message);
      if (result?.data.message === "OTP is wrong") {
        toast.error(result?.data.message);
      }
      if (result?.data.Isexpired == true) {
        toast.error(result?.data.message);
      }
      if (result?.data.isUser === true) {
        navigate("/login");
        toast.success("Registration Successful");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await resendOtp();
      setSeconds(30);
      setIsOtpExpired(false);
      if (result?.data.isOtp == true) {
        toast.success(result?.data.message);
      }
    } catch (error) {
      console.log(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-r from-white to-yellow-50">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-2xl transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Enter OTP
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Code sent to your Email
        </p>
        <div className="flex justify-center my-4">
          <input
            type="text"
            value={otp}
            onChange={handleOTPChange}
            maxLength={6}
            className="w-2/3 p-2 rounded-lg bg-gray-100 text-gray-700 text-center outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center flex-col justify-between mb-6">
          <p className="text-gray-600 text-sm">
            Didn't receive code?{" "}
            <span onClick={resendOTP} className="text-blue-500 cursor-pointer">
              click here
            </span>
          </p>
          <div className="ps-1">
            {isOtpExpired ? (
              <div>
                Otp Expired{" "}
                <span
                  onClick={resendOTP}
                  className="text-blue-500 cursor-pointer"
                >
                  Request another?
                </span>
              </div>
            ) : (
              <div>
                Otp expires in {minutes} min {remainingSeconds} sec
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleVerify}
          className="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? "Loading..." : "Verify"}{" "}
          {/* Change the button text when loading */}
        </button>
      </div>
    </div>
  );
};

export default OTPComponent;

import { Route, Routes } from "react-router-dom";
import UserLoggedOut from "../Components/User/UserCommen/UserLoggedOut";
import UserLogdin from "../Components/User/UserCommen/UserLogdin";
import LoginPage from "../Pages/user/LoginPage";
import SignupPage from "../Pages/user/SignupPage";
import Otppage from "../Pages/user/Otppage";
import Home from "../Pages/user/Home";
import ForgertPasswort from "../Pages/user/ForgertPasswort";
import RestOtp from "../Pages/user/RestOtp";
import OTPComponent from "../Pages/user/OtpPassReset";
import Erorr404 from "../Components/Common/ErorrPage/Erorr404";
import MechnichData from "../Pages/user/MechnichData";
import MechanicDetails from "../Pages/user/MechanicDetails";
import UserProfile from "../Pages/user/UserProfile";
import MechBooking from "../Pages/user/MechBooking";
import Profile from "../Components/User/Profile/Profile";
import Bookings from "../Components/User/Profile/Bookings";
import Payment from "../Components/User/Profile/Payment";
import Privacy from "../Components/User/Profile/Privacy";
import ProfileEditContent from "../Components/User/miscellaneous/ProfileEdit";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="mechanicData" element={<MechnichData />} />
      <Route path="mechanicData/:id" element={<MechanicDetails />} />
      
      <Route element={<UserLoggedOut />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="otp-page" element={<Otppage />} />
        <Route path="forget/otp-page/:userId" element={<OTPComponent />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgetPassword" element={<ForgertPasswort />} />
        <Route path="/reset/:userid" element={<RestOtp />} />
      </Route>

      <Route element={<UserLogdin />}>
        <Route path="profiler" element={<UserProfile />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="payment" element={<Payment />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="editProfile" element={<ProfileEditContent />} />
        </Route>
        <Route path="booking/:id" element={<MechBooking />} />
      </Route>

      <Route path="*" element={<Erorr404 />} />
    </Routes>
  );
}

export default UserRoutes;
import { Route, Routes } from "react-router-dom";
import MechanicLoggedOut from "../Components/Mechanic/MechanicCommen/MechanicLoggedOut";
import LoginPage from "../Pages/mechanic/LoginPage";
import SignupPage from "../Pages/mechanic/SignupPage";
import MOtppage from "../Pages/mechanic/Otppage.tsx";
import MechanicLoggedin from "../Components/Mechanic/MechanicCommen/MechanicLoggedin.tsx";
import MechanicHome from "../Pages/mechanic/MechanicHome.tsx";
import ForgotPassword from "../Pages/mechanic/ForgotPassword.tsx";
import OTPComponent1 from "../Pages/mechanic/OtpPassReset.tsx";
import RestOtp from "../Pages/mechanic/RestOtp.tsx";
import Erorr404 from "../Components/Common/ErorrPage/Erorr404.tsx";
import MechanicProfile from "../Pages/mechanic/MechanicProfile.tsx";
import Dashboard from "../Components/Mechanic/DashBord.tsx";
import DetailedProfile from "../Pages/mechanic/DetailedProfile.tsx";
import ChatPage from "../Pages/mechanic/ChatPage.tsx";
import NotificationPage from "../Pages/mechanic/NotificationPage.tsx";
import Customers from "../Components/Mechanic/Customers.tsx";
import Bookings from "../Components/Mechanic/Bookings.tsx";
import Service from "../Components/Mechanic/Service.tsx";
import BlogMech from "../Components/Mechanic/BlogMech.tsx";
import Payments from "../Components/Mechanic/Payments.tsx";
import BlogForm from "../Components/Mechanic/miscellaneous/Blog/BlogForm.tsx";
import BlogEdit from "../Components/Mechanic/miscellaneous/Blog/BlogEdit.tsx";

function mechanicRoutes() {
  return (
    <Routes>
      <Route element={<MechanicLoggedOut />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="otp-page" element={<MOtppage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgetPassword" element={<ForgotPassword />} />
        <Route path="forget/otp-page/:userId" element={<OTPComponent1 />} />
        <Route path="reset/:userid" element={<RestOtp />} />
      </Route>
      <Route path="*" element={<Erorr404 />}></Route>

      <Route element={<MechanicLoggedin />}>
        <Route path="profile" element={<MechanicProfile />} />
        <Route path="profile/detailedProfile" element={<DetailedProfile />} />
        <Route path="home/messages" element={<ChatPage />} />
        <Route path="home/notifications" element={<NotificationPage />} />

        <Route path="home" element={<MechanicHome />}>
          <Route path="dashbord" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="service" element={<Service />} />
          <Route path="blog" element={<BlogMech />} />
          <Route path="payments" element={<Payments />} />
          <Route path="create-blog" element={<BlogForm />} />
          <Route path="edit-blog/:id" element={<BlogEdit  />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default mechanicRoutes;

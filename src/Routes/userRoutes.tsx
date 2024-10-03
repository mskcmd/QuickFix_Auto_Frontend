// import { Route, Routes } from "react-router-dom";
// import UserLoggedOut from "../Components/User/UserCommen/UserLoggedOut";
// import UserLogdin from "../Components/User/UserCommen/UserLogdin";
// import LoginPage from "../Pages/user/LoginPage";
// import SignupPage from "../Pages/user/SignupPage";
// import Otppage from "../Pages/user/Otppage";
// import Home from "../Pages/user/Home";
// import ForgertPasswort from "../Pages/user/ForgertPasswort";
// import RestOtp from "../Pages/user/RestOtp";
// import OTPComponent from "../Pages/user/OtpPassReset";
// import Erorr404 from "../Components/Common/ErorrPage/Erorr404";
// import MechnichData from "../Pages/user/MechnichData";
// import MechanicDetails from "../Pages/user/MechanicDetails";
// import UserProfile from "../Pages/user/UserProfile";
// import MechBooking from "../Pages/user/MechBooking";
// import Profile from "../Components/User/Profile/Profile";
// import Bookings from "../Components/User/Profile/Bookings";
// import Payment from "../Components/User/Profile/Payment";
// import Privacy from "../Components/User/Profile/Privacy";
// import ProfileEditContent from "../Components/User/miscellaneous/ProfileEdit";
// import ChatPage from "../Pages/user/ChatPage";
// import CancelPage from "../Components/User/miscellaneous/CancelPage";
// import SuccessPage from "../Components/User/miscellaneous/Success ";
// import Service from "../Pages/user/Service";
// import Blog from "../Pages/user/Blog";

// function UserRoutes() {
//   return (
//     <Routes>
//       <Route path="/home" element={<Home />} />
//       <Route path="mechanicData" element={<MechnichData />} />
//       <Route path="mechanicData/:id" element={<MechanicDetails />} />
      
//       <Route element={<UserLoggedOut />}>
//         <Route path="login" element={<LoginPage />} />
//         <Route path="otp-page" element={<Otppage />} />
//         <Route path="forget/otp-page/:userId" element={<OTPComponent />} />
//         <Route path="signup" element={<SignupPage />} />
//         <Route path="forgetPassword" element={<ForgertPasswort />} />
//         <Route path="/reset/:userid" element={<RestOtp />} />
//       </Route>

//       <Route element={<UserLogdin />}>
//         <Route path="profiler" element={<UserProfile />}>
//           <Route index element={<Profile />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="bookings" element={<Bookings />} />
//           <Route path="payment" element={<Payment />} />
//           <Route path="SuccessPage" element={<SuccessPage />} />
//           <Route path="CancelPage" element={<CancelPage/>} />
//           <Route path="privacy" element={<Privacy />} />
//           <Route path="editProfile" element={<ProfileEditContent />} />
//         </Route>
//         <Route path="booking/:id" element={<MechBooking />} />
//         <Route path="chatInterface" element={<ChatPage />} />
//         <Route path="services" element={<Service />} />
//         <Route path="blog" element={<Blog />} />


//       </Route>

//       <Route path="*" element={<Erorr404 />} />
//     </Routes>
//   );
// }

// export default UserRoutes;

import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import UserLoggedOut from "../Components/User/UserCommen/UserLoggedOut";
import UserLogdin from "../Components/User/UserCommen/UserLogdin";
import Erorr404 from "../Components/Common/ErorrPage/Erorr404";
import SkeletonLogin from "../Components/Loder/Admin/SkeletonLogin";
import SkeletonSingup from "../Components/Loder/Admin/SkeletonSingup";
import SkeletonService from "../Components/Loder/User/SkeletonService";
import HeroSkeleton from "../Components/Loder/User/SkeletonHome";
import BlogSkeleton from "../Components/Loder/User/SkeletonBlog";

// Import Skeleton component

// Lazy load components
const Home = React.lazy(() => import("../Pages/user/Home"));
const LoginPage = React.lazy(() => import("../Pages/user/LoginPage"));
const SignupPage = React.lazy(() => import("../Pages/user/SignupPage"));
const Otppage = React.lazy(() => import("../Pages/user/Otppage"));
const ForgertPasswort = React.lazy(() => import("../Pages/user/ForgertPasswort"));
const RestOtp = React.lazy(() => import("../Pages/user/RestOtp"));
const OTPComponent = React.lazy(() => import("../Pages/user/OtpPassReset"));
const MechnichData = React.lazy(() => import("../Pages/user/MechnichData"));
const MechanicDetails = React.lazy(() => import("../Pages/user/MechanicDetails"));
const UserProfile = React.lazy(() => import("../Pages/user/UserProfile"));
const MechBooking = React.lazy(() => import("../Pages/user/MechBooking"));
const Profile = React.lazy(() => import("../Components/User/Profile/Profile"));
const Bookings = React.lazy(() => import("../Components/User/Profile/Bookings"));
const Payment = React.lazy(() => import("../Components/User/Profile/Payment"));
const Privacy = React.lazy(() => import("../Components/User/Profile/Privacy"));
const ProfileEditContent = React.lazy(() => import("../Components/User/miscellaneous/ProfileEdit"));
const ChatPage = React.lazy(() => import("../Pages/user/ChatPage"));
const CancelPage = React.lazy(() => import("../Components/User/miscellaneous/CancelPage"));
const SuccessPage = React.lazy(() => import("../Components/User/miscellaneous/Success "));
const Service = React.lazy(() => import("../Pages/user/Service"));
const Blog = React.lazy(() => import("../Pages/user/Blog"));
const MechBookingSkeleton = React.lazy(() => import("../Components/User/Skeleton/MechBooking"));


function UserRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Suspense fallback={<HeroSkeleton/>}><Home /></Suspense>} />
      <Route path="mechanicData" element={<Suspense fallback={<div>Loading...</div>}><MechnichData /></Suspense>} />
      <Route path="mechanicData/:id" element={<Suspense fallback={<div>Loading...</div>}><MechanicDetails /></Suspense>} />
      
      <Route element={<UserLoggedOut />}>
        <Route path="login" element={<Suspense fallback={<SkeletonLogin />}><LoginPage /></Suspense>} />
        <Route path="otp-page" element={<Suspense fallback={<div>Loading...</div>}><Otppage /></Suspense>} />
        <Route path="forget/otp-page/:userId" element={<Suspense fallback={<div>Loading...</div>}><OTPComponent /></Suspense>} />
        <Route path="signup" element={<Suspense fallback={<SkeletonSingup/>}><SignupPage /></Suspense>} />
        <Route path="forgetPassword" element={<Suspense fallback={<div>Loading...</div>}><ForgertPasswort /></Suspense>} />
        <Route path="/reset/:userid" element={<Suspense fallback={<div>Loading...</div>}><RestOtp /></Suspense>} />
      </Route>

      <Route element={<UserLogdin />}>
        <Route path="profiler" element={<Suspense fallback={<div>Loading...</div>}><UserProfile /></Suspense>}>
          <Route index element={<Suspense fallback={<div>Loading...</div>}><Profile /></Suspense>} />
          <Route path="profile" element={<Suspense fallback={<div>Loading...</div>}><Profile /></Suspense>} />
          <Route path="bookings" element={<Suspense fallback={<div>Loading...</div>}><Bookings /></Suspense>} />
          <Route path="payment" element={<Suspense fallback={<div>Loading...</div>}><Payment /></Suspense>} />
          <Route path="SuccessPage" element={<Suspense fallback={<div>Loading...</div>}><SuccessPage /></Suspense>} />
          <Route path="CancelPage" element={<Suspense fallback={<div>Loading...</div>}><CancelPage /></Suspense>} />
          <Route path="privacy" element={<Suspense fallback={<div>Loading...</div>}><Privacy /></Suspense>} />
          <Route path="editProfile" element={<Suspense fallback={<div>Loading...</div>}><ProfileEditContent /></Suspense>} />
        </Route>
        <Route 
          path="booking/:id" 
          element={
            <Suspense fallback={<MechBookingSkeleton />}>
              <MechBooking />
            </Suspense>
          } 
        />
        <Route path="chatInterface" element={<Suspense fallback={<div>Loading...</div>}><ChatPage /></Suspense>} />
        <Route path="services" element={<Suspense fallback={<SkeletonService/>}><Service /></Suspense>} />
        <Route path="blog" element={<Suspense fallback={<BlogSkeleton/>}><Blog /></Suspense>} />
      </Route>

      <Route path="*" element={<Erorr404 />} />
    </Routes>
  );
}

export default UserRoutes;
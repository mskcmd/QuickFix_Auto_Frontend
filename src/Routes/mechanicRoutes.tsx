import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy-loaded components
const MechanicLoggedOut = lazy(
  () => import("../Components/Mechanic/MechanicCommen/MechanicLoggedOut")
);
const LoginPage = lazy(() => import("../Pages/mechanic/LoginPage"));
const SignupPage = lazy(() => import("../Pages/mechanic/SignupPage"));
const MOtppage = lazy(() => import("../Pages/mechanic/Otppage.tsx"));
const MechanicLoggedin = lazy(
  () => import("../Components/Mechanic/MechanicCommen/MechanicLoggedin.tsx")
);
const MechanicHome = lazy(() => import("../Pages/mechanic/MechanicHome.tsx"));
const ForgotPassword = lazy(
  () => import("../Pages/mechanic/ForgotPassword.tsx")
);
const OTPComponent1 = lazy(() => import("../Pages/mechanic/OtpPassReset.tsx"));
const RestOtp = lazy(() => import("../Pages/mechanic/RestOtp.tsx"));
const Erorr404 = lazy(
  () => import("../Components/Common/ErorrPage/Erorr404.tsx")
);
const MechanicProfile = lazy(
  () => import("../Pages/mechanic/MechanicProfile.tsx")
);
const Dashboard = lazy(() => import("../Components/Mechanic/DashBord.tsx"));
const DetailedProfile = lazy(
  () => import("../Pages/mechanic/DetailedProfile.tsx")
);
const ChatPage = lazy(() => import("../Pages/mechanic/ChatPage.tsx"));
const NotificationPage = lazy(
  () => import("../Pages/mechanic/NotificationPage.tsx")
);
const Customers = lazy(() => import("../Components/Mechanic/Customers.tsx"));
const Bookings = lazy(() => import("../Components/Mechanic/Bookings.tsx"));
const Service = lazy(() => import("../Components/Mechanic/Service.tsx"));
const BlogMech = lazy(() => import("../Components/Mechanic/BlogMech.tsx"));
const Payments = lazy(() => import("../Components/Mechanic/Payments.tsx"));
const BlogForm = lazy(
  () => import("../Components/Mechanic/miscellaneous/Blog/BlogForm.tsx")
);
const BlogEdit = lazy(
  () => import("../Components/Mechanic/miscellaneous/Blog/BlogEdit.tsx")
);
const SkeletonLogin = lazy(()=>import("../Components/Loder/Admin/SkeletonLogin.tsx"))

function mechanicRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MechanicLoggedOut />}>
          <Route
            path="login"
            element={
              <Suspense fallback={<SkeletonLogin />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route path="otp-page" element={<MOtppage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgetPassword" element={<ForgotPassword />} />
          <Route path="forget/otp-page/:userId" element={<OTPComponent1 />} />
          <Route path="reset/:userid" element={<RestOtp />} />
        </Route>
        <Route path="*" element={<Erorr404 />} />

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
            <Route path="edit-blog/:id" element={<BlogEdit />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default mechanicRoutes;

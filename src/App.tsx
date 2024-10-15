import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminRouter from "./Routes/adminRoutes";
import MechanicRoutes from "./Routes/mechanicRoutes";
import UserRoutes from "./Routes/userRoutes";
import UserLoggedOut from "./Components/User/UserCommen/UserLoggedOut";
import LandingPage from "./Pages/user/LandingPage";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      <ToastContainer />
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
          <Routes>
            <Route element={<UserLoggedOut />}>
              <Route path="" element={<LandingPage />} />
            </Route>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/mechanic/*" element={<MechanicRoutes />} />
            <Route path="/admin/*" element={<AdminRouter />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

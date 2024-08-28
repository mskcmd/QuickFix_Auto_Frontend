import { Route, Routes } from "react-router-dom";
import AdminProtucter from "../Components/Admin/AdminCommen/AdminProtucter";
import AdminLogin from "../Pages/admin/AdminLogin";
import AdminLoggedOut from "../Components/Admin/AdminCommen/AdminLoggedOut";
import AdminHome from "../Pages/admin/AdminHome";
import Users from "../Pages/admin/Users";
import Dashboard from "../Pages/admin/AdminDashboard";
import Mechanics from "../Pages/admin/Mechanics";

function adminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLoggedOut />}>
        <Route path="login" element={<AdminLogin />} />
      </Route>
      <Route element={<AdminProtucter />}>
        <Route path="dashboard" element={<AdminHome />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="mechanics" element={<Mechanics />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default adminRoutes;

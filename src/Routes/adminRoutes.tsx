import { Route, Routes } from "react-router-dom";
import AdminProtucter from "../Components/Admin/AdminCommen/AdminProtucter";
import AdminLoggedOut from "../Components/Admin/AdminCommen/AdminLoggedOut";
import React, { Suspense } from "react";

// Lazy load the components
const AdminLogin = React.lazy(() => import("../Pages/admin/AdminLogin"));
const AdminHome = React.lazy(() => import("../Pages/admin/AdminHome"));
const Users = React.lazy(() => import("../Pages/admin/Users"));
const Dashboard = React.lazy(() => import("../Pages/admin/AdminDashboard"));
const Mechanics = React.lazy(() => import("../Pages/admin/Mechanics"));
const SkeletonLogin = React.lazy(
  () => import("../Components/Loder/Admin/SkeletonLogin")
);

// Skeleton Loader Component
function SkeletonLoader() {
  return <div>Loading...</div>; // Customize this to your liking
}

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLoggedOut />}>
        <Route
          path="login"
          element={
            <Suspense fallback={<SkeletonLogin />}>
              <AdminLogin />
            </Suspense>
          }
        />
      </Route>
      <Route element={<AdminProtucter />}>
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <AdminHome />
            </Suspense>
          }
        >
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="users"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <Users />
              </Suspense>
            }
          />
          <Route
            path="mechanics"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <Mechanics />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;

import React, { useState } from "react";
import Sidebar from "../../Components/Admin/Commen/AdminSideBar";
import Header from "../../Components/Admin/Commen/AdminHeader";
import { AdminProvider } from "../../app/Hooks/AdminContext";
import { Outlet } from "react-router-dom";

const AdminHome: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminProvider>
      <div className="flex h-screen bg-gray-100">
        <div className={`md:flex ${sidebarOpen ? "block" : "hidden"}`}>
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminHome;

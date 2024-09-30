import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Admin/Commen/AdminSideBar";
import Header from "../../Components/Admin/Commen/AdminHeader";
import { AdminProvider } from "../../app/Hooks/AdminContext";
import { Outlet } from "react-router-dom";

const AdminHome: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth < 1024;
      setIsSmallScreen(smallScreen);
      if (!smallScreen) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <AdminProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} isSmallScreen={isSmallScreen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} isSmallScreen={isSmallScreen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminHome;
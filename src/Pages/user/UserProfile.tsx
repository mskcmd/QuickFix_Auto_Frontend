import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/User/Header";
import Sidebar from "../../Components/User/Profile/Sidebar";
import { FaBars } from "react-icons/fa";

const UserProfile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col lg:flex-row">
        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
        <div className="flex-grow p-4 lg:p-8">
          <button
            className="lg:hidden mb-4 p-2 bg-purple-600 text-white rounded"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          <div className="bg-white shadow-lg rounded-lg p-4 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
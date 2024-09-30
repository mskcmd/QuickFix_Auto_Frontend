import React, { useState } from "react";
import { User, Settings, MessageSquare, Menu, X } from "lucide-react";
import SettingsModal from "./SettingsModal";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  isSmallScreen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen, isSmallScreen }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        {isSmallScreen && (
          <button 
            onClick={toggleSidebar} 
            className="mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
        <div className="text-2xl font-bold text-gray-800">Admin Dashboard</div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
          <MessageSquare size={20} />
        </button>
        <button
          onClick={toggleSettings}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <Settings size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
          <User size={20} />
        </button>
      </div>
      {isSettingsOpen && (
        <SettingsModal
          toggleSettings={toggleSettings}
          mechanicData={{
            name: undefined
          }}
        />
      )}

      {isSettingsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSettings}
        ></div>
      )}
    </header>
  );
};

export default Header;
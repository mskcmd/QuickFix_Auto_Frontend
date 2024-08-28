import React, { useState } from "react";
import { FaUser, FaCog, FaComments, FaBars } from "react-icons/fa";
import SettingsModal from "./SettingsModal";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 md:hidden">
          <FaBars size={20} />
        </button>
        <div className="text-2xl font-bold text-gray-800">Admin Dashboard</div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <FaComments size={20} />
        </button>
        <button
          onClick={toggleSettings}
          className="text-gray-600 hover:text-gray-800"
        >
          <FaCog size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <FaUser size={20} />
        </button>
      </div>
      {isSettingsOpen && (
        <SettingsModal
          toggleSettings={toggleSettings} mechanicData={{
            name: undefined
          }}          // mechanicData={mechanicData?.data}
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

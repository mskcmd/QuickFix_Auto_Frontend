  /* eslint-disable @typescript-eslint/no-explicit-any */
  import React, { useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  import { useAppSelector } from "../../app/store";
  import NavButton from "./NavButton";
  import SettingsModal from "./SettingsModal";
  import { FiSettings, FiMenu } from "react-icons/fi";
  import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
  import { IoIosNotifications } from "react-icons/io";

  const Header: React.FC = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const mechanicData: any = useAppSelector((state) => state.auth.mechanicData);
    const location = useLocation();

    const nameInitials = mechanicData?.data?.name
      ? mechanicData.data.name.slice(0, 2).toUpperCase()
      : "MG";

    return (
      <header className="bg-gray-900 p-2 shadow-lg relative">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-600 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-md transform hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm sm:text-xl font-bold">
                {nameInitials}
              </span>
            </div>
            <span className="text-lg sm:text-2xl font-bold text-white tracking-wide">
              {mechanicData?.data?.name || "MG Service Store"}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
          {location.pathname !== "/Mechanic/Home/messages" && (
              <Link to="messages">
                <NavButton icon={<HiMiniChatBubbleLeftRight size={24} />} count={3} />
              </Link>
            )}

            <Link to="notifications">
              <NavButton icon={<IoIosNotifications size={24} />} count={5} />
            </Link>
            <button
              onClick={toggleSettings}
              className="p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full transition-colors duration-300"
            >
              <FiSettings size={24} />
            </button>
          </div>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
            onClick={toggleMobileMenu}
          >
            <FiMenu size={24} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-2 bg-gray-800 rounded-lg">
            <div className="flex justify-around">
            {location.pathname !== "/Mechanic/Home/messages" && (
              <Link to="messages">
                <NavButton icon={<HiMiniChatBubbleLeftRight size={24} />} count={3} />
              </Link>
                   )}
              <Link to="notifications">
                <NavButton icon={<IoIosNotifications size={24} />} count={5} />
              </Link>
              <button
                onClick={toggleSettings}
                className="p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full transition-colors duration-300"
              >
                <FiSettings size={24} />
              </button>
            </div>
          </div>
        )}

        {isSettingsOpen && (
          <SettingsModal
            toggleSettings={toggleSettings}
            mechanicData={mechanicData?.data}
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
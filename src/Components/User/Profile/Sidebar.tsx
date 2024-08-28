import React from "react";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logout } from "../../../Api/user";
import { userLogout } from "../../../app/slice/AuthSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = location.pathname.split("/").pop() || "profile";
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout().then(() => {
          console.log("User logged out");
        });
        dispatch(userLogout());
        navigate("/login");
        toast.success("You are logged out!");
      }
    });
  };
  const navigateTo = (tab: string) => {
    navigate(`/profiler/${tab}`);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`w-64 bg-white shadow-lg lg:shadow-none p-6 fixed lg:sticky top-0 left-0 h-full lg:h-auto transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } z-50 lg:z-auto overflow-y-auto`}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-gray-600"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 rounded-full h-24 w-24 flex items-center justify-center mb-4">
            <FaUserCircle className="text-gray-400 text-4xl" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">SUHAIL K</h2>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {["profile", "bookings", "payment", "privacy"].map((tab) => (
              <li
                key={tab}
                className={`text-gray-700 py-2 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => navigateTo(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </li>
            ))}
            <li
              className="text-gray-700 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

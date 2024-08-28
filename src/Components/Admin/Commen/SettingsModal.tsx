import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMessageCircle, FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { logout } from "../../../Api/admin";
import { adminLogout } from "../../../app/slice/AuthSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface SettingsModalProps {
  toggleSettings: () => void;
  mechanicData: {
    name?: string;
  };
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  toggleSettings,
  mechanicData,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          console.log("admin logged out");
        });
        dispatch(adminLogout());
        navigate("/admin/login");
        toast.success("You are logged out!");
      }
    });
  };

  return (
    <>
      <div className="absolute right-4 top-16 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-50 transform transition-all duration-300 ease-in-out">
        <div className="p-4 bg-black">
          <h3 className="text-lg font-semibold text-white">
            {mechanicData?.name || "Settings"}
          </h3>
        </div>
        <div className="divide-y divide-gray-300">
          <Link to="/" className="block">
            <button className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3">
              <FiUser className="text-black" size={20} />
              <span className="text-black">Profile</span>
            </button>
          </Link>
          <Link to="/" className="block">
            <button className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3">
              <FiMessageCircle className="text-black" size={20} />
              <span className="text-black">Feedback</span>
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
          >
            <FiLogOut className="text-black" size={20} />
            <span className="text-black">Logout</span>
          </button>
        </div>
        <div className="bg-gray-100 p-2">
          <button
            onClick={toggleSettings}
            className="w-full px-4 py-2 bg-black text-white rounded-md transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;

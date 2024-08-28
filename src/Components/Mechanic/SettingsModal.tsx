import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMessageCircle, FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { logout } from "../../Api/mechanic";
import { useDispatch } from "react-redux";
import { mechLogout } from "../../app/slice/AuthSlice";
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
          console.log("Mech logged out");
        });
        dispatch(mechLogout());
        navigate("/mechanic/login");
        toast.success("You are logged out!"); 

      }
    });
  };

  return (
    <div className="absolute right-4 top-16 w-64 bg-gray-800 rounded-lg shadow-xl overflow-hidden z-50 transform transition-all duration-300 ease-in-out">
      <div className="p-4 bg-black">
        <h3 className="text-lg font-semibold text-white">
          {mechanicData?.name || "Settings"}
        </h3>
      </div>
      <div className="divide-y divide-gray-700">
        <Link to="/mechanic/profile" className="block">
          <button className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3">
            <FiUser className="text-purple-400" size={20} />
            <span className="text-gray-300">Profile</span>
          </button>
        </Link>
        <Link to="/mechanic/feedback" className="block">
          <button className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3">
            <FiMessageCircle className="text-purple-400" size={20} />
            <span className="text-gray-300">Feedback</span>
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3"
        >
          <FiLogOut className="text-purple-400" size={20} />
          <span className="text-gray-300">Logout</span>
        </button>
      </div>
      <div className="bg-gray-700 p-2">
        <button
          onClick={toggleSettings}
          className="w-full px-4 py-2 bg-black text-white rounded-md transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;

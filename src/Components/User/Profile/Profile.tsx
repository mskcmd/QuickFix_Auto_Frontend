import React from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaPencilAlt } from "react-icons/fa";
import { useAppSelector } from "../../../app/store";
import { Link } from "react-router-dom";

const ProfileContent: React.FC = () => {
  const userData = useAppSelector((state) => state.auth.userData);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
        My Profile
      </h2>
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full h-40 w-40 flex items-center justify-center shadow-lg mb-6 md:mb-0">
          {userData?.data.imageUrl ? (
            <img
              src={userData.data.imageUrl}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-white text-7xl" />
          )}
        </div>

        <div className="md:ml-12 space-y-6 flex-grow">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
            <FaUserCircle className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <h3 className="text-lg font-semibold text-gray-800">
                {userData?.data.name}
              </h3>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
            <FaEnvelope className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-700">{userData?.data.email}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
            <FaPhone className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-700">{userData?.data.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <Link to="/profiler/editProfile">
        <button className="bg-purple-600 text-white px-6 py-3  rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center w-full md:w-auto">
          <FaPencilAlt className="mr-2" />
          Edit Profile
        </button>
      </Link>
    </div>
  );
};

export default ProfileContent;

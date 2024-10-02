import React from "react";
import { motion } from "framer-motion";
import { MechanicProfile } from "./Types";

interface ProfileHeaderProps {
  mechanic: MechanicProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ mechanic }) => (
  <div className="relative h-80 bg-gradient-to-r from-blue-500 to-purple-600">
    <img
      src={mechanic.profileImages[1]?.url || "/default-profile.jpg"}
      alt={`Profile of ${mechanic.name}`}
      className="h-full w-full object-cover opacity-50"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-2">{mechanic.name}</h1>
      <p className="text-2xl font-semibold">{mechanic.specialization}</p>
    </div>
    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-20">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-lg"
      >
        <img
          src={mechanic.profileImages[0]?.url || "/default-profile.jpg"}
          alt={`Profile of ${mechanic.name}`}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  </div>
);

export default ProfileHeader;
import React from "react";
import { FaTools } from "react-icons/fa";

interface MechanicHeaderProps {
  mechanic: {
    name: string;
    specialization: string;
    experience: number;
    profileImage: { url: string };
  } | null;
}

const MechanicHeader: React.FC<MechanicHeaderProps> = ({ mechanic }) => {
  if (!mechanic) return null;

  return (
    <div className="bg-gray-900 text-white p-8 flex items-center space-x-6">
      <img
        src={mechanic.profileImage.url}
        alt={mechanic.name}
        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
      />
      <div>
        <h2 className="text-3xl font-bold">{mechanic.name}</h2>
        <p className="text-gray-300 mt-1">{mechanic.specialization}</p>
        <div className="flex items-center mt-2">
          <FaTools className="text-yellow-400 mr-2" />
          <span className="text-sm">{mechanic.experience} Years Experience</span>
        </div>
      </div>
    </div>
  );
};

export default MechanicHeader;
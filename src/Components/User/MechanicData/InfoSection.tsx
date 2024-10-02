import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaTools, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { MechanicProfile } from "./Types";

interface InfoSectionProps {
  mechanic: MechanicProfile;
  onBooking: () => void;
}

const InfoItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center text-gray-700">
    <div className="mr-3 text-xl">{icon}</div>
    <span>{text}</span>
  </div>
);

const WorkingHours: React.FC<{ workingHours: MechanicProfile["workingHours"] }> = ({ workingHours }) => {
  const parseDays = (days: string) => {
    try {
      const parsedDays = JSON.parse(days);
      return Array.isArray(parsedDays) ? parsedDays.join(", ") : days;
    } catch {
      return days;
    }
  };

  return (
    <div className="mt-8">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">Working Hours</h4>
      <ul className="list-disc list-inside">
        {workingHours.map((item, index) => (
          <li key={index} className="text-gray-700">
            {parseDays(item.days)}: {item.startTime} - {item.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

const InfoSection: React.FC<InfoSectionProps> = ({ mechanic, onBooking }) => (
  <div>
    <h3 className="text-2xl font-semibold mb-4 text-gray-800">About Me</h3>
    <p className="text-gray-600 text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: mechanic.description }}></p>

    <div className="space-y-4">
      <InfoItem icon={<FaMapMarkerAlt className="text-blue-500" />} text={mechanic.locationName} />
      <InfoItem icon={<FaClock className="text-green-500" />} text={`${mechanic.drivingTime} minutes driving time`} />
      <InfoItem icon={<FaTools className="text-purple-500" />} text={`${mechanic.yearsOfExperience} years of experience`} />
      {mechanic.phoneNumber && <InfoItem icon={<FaPhone className="text-red-500" />} text={mechanic.phoneNumber} />}
      {mechanic.email && <InfoItem icon={<FaEnvelope className="text-yellow-500" />} text={mechanic.email} />}
    </div>
    <WorkingHours workingHours={mechanic.workingHours} />
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
      onClick={onBooking}
    >
      <FaCalendarAlt className="mr-2" />
      Book Now
    </motion.button>
  </div>
);

export default InfoSection;
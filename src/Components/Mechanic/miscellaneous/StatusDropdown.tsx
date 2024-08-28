import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface StatusDropdownProps {
  status: string;
  userId: string;
  handleStatusChange: (userId: string, newStatus: string) => void;
}

export const statusOptions = [
  "Pending",
  "Completed",
  "Ongoing",
  "Upcoming",
  "Cancelled",
];


const StatusDropdown: React.FC<StatusDropdownProps> = ({
  status,
  userId,
  handleStatusChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleSelect = (newStatus: string) => {
    setSelectedStatus(newStatus);
    handleStatusChange(userId, newStatus);
    setIsOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-orange-600 bg-orange-100";
      case "Completed":
        return "text-green-600 bg-green-100";
      case "Ongoing":
        return "text-yellow-600 bg-yellow-100";
      case "Upcoming":
        return "text-blue-600 bg-blue-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-4 py-2 rounded-lg ${getStatusColor(
          selectedStatus
        )} cursor-pointer`}
      >
        <span className="flex-1 text-sm font-semibold">{selectedStatus}</span>
        <FaChevronDown className="ml-2" />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {statusOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;

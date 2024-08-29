import React from "react";
import { FaMapMarkerAlt, FaEye, FaUser } from "react-icons/fa";
import dayjs from "dayjs";
import { User } from "../../../Type/MType";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

const items = [
  {
    key: "Pending",
    label: "Pending",
  },
  {
    key: "Completed",
    label: "Completed",
  },
  {
    key: "Ongoing",
    label: "Ongoing",
  },
  {
    key: "Upcoming",
    label: "Upcoming",
  },
  {
    key: "Cancelled",
    label: "Cancelled",
  },
];

interface TableBodyProps {
  users: User[];
  handleViewDetails: (user: User) => void;
  handleStatusChange: (userId: string, newStatus: string) => void;
  handleMapClick: (coordinates: [number, number]) => void;
}

const TableBody: React.FC<TableBodyProps> = ({
  users,
  handleViewDetails,
  handleStatusChange,
  handleMapClick,
}) => {
  const handleSelect = (newStatus: string, userId: string) => {
    handleStatusChange(userId, newStatus);
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
    <tbody className="bg-white divide-y divide-gray-200">
      {users.map((user) => (
        <tr key={user.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                {user.user.imageUrl ? (
                  <img
                    src={user.user.imageUrl}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="h-10 w-10 rounded-full text-gray-400" />
                )}
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {user.user.phone}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => handleMapClick(user.coordinates)}
            >
              <FaMapMarkerAlt className="inline mr-1" />
              View on Map
            </button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap relative">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className={`flex items-center px-4 py-2 rounded-lg ${getStatusColor(
                    user.status
                  )} cursor-pointer`}
                  variant="bordered"
                >
                  {user.status}
                  <ChevronUpDownIcon className="w-5 h-5 ml-2" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                  <DropdownItem
                    key={item.key}
                    onClick={() => handleSelect(item.key, user._id)}
                    color={item.key === "Cancelled" ? "danger" : "default"}
                    className={item.key === "delete" ? "text-danger" : ""}
                  >
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {dayjs(user.bookingTime).format("DD/MM/YYYY hh:mm A")}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button
              className="text-indigo-600 hover:text-indigo-900"
              onClick={() => handleViewDetails(user)}
            >
              <FaEye className="inline mr-1" />
              View Details
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

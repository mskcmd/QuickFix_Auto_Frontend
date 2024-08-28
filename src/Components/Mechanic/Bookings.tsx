import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaUser,
  FaEye,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useAppSelector } from "../../app/store";
import { fetchUsers, statusUpdate } from "../../Api/mechanic";
import dayjs from "dayjs";

interface User {
  [x: string]: any;
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  bookingTime: string;
  coordinates: [number, number];
  locationName: string;
  serviceDetails: string;
  complainDescription: string;
  bookingCount?: number;
}

const statusOptions = [
  "Pending",
  "Completed",
  "Ongoing",
  "Upcoming",
  "Cancelled",
];

const Customers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [status,setStatus]=useState<any>("")
  const [showDropdown, setShowDropdown] = useState<{ [key: string]: boolean }>(
    {}
  );
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);

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

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          const result = await fetchUsers(mechanicData.mechnicId);
          setUsers(result.data);
          console.log(result.data);
        } catch (error) {
          console.error("Failed to fetch mechanic data:", error);
        }
      }
    };

    fetchMechanicData();
  }, [status]);

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
  };

  const handleMapClick = (coordinates: [number, number]) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${coordinates[0]},${coordinates[1]}`,
      "_blank"
    );
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    // Implement status change logic here
    console.log(`Changing status for user ${userId} to ${newStatus}`);
    try {
      const result = await statusUpdate(userId, newStatus);
      console.log(result);
      setStatus(result)
    } catch (error) {
      console.log(error);
    }
    // setUsers((prevUsers) =>
    //   prevUsers.map((user) =>
    //     user._id === userId ? { ...user, status: newStatus } : user
    //   )
    // );
  };

  const toggleDropdown = (userId: string) => {
    setShowDropdown((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.phone.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Booking Details</h1>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date && Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <FaUser className="h-10 w-10 rounded-full text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
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
                    <button
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        user.status
                      )} cursor-pointer`}
                      onClick={() => toggleDropdown(user.id)}
                    >
                      {user.status} <FaChevronDown className="ml-1 m-1.5" />
                    </button>
                    {showDropdown[user.id] && (
                      <div className=" mt-2 py-2 w-40 bg-white rounded-md shadow-xl z-50 fixed">
                        {statusOptions.map((statusOption) => (
                          <button
                            key={statusOption}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              handleStatusChange(user._id, statusOption);
                              toggleDropdown(user.id);
                            }}
                          >
                            {statusOption}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dayjs(user.bookingTime).format("DD/MM/YYYY hh:mm A")}{" "}
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
          </table>
        </div>
      </div>
      {selectedUser && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
          id="my-modal"
        >
          <div className="relative p-8 border w-full max-w-xl shadow-lg rounded-lg bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              User Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedUser.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedUser.user.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Location:</span>{" "}
                  {selectedUser.locationName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Service Details:</span>{" "}
                  {selectedUser.serviceDetails}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Complaint Description:</span>{" "}
                  {selectedUser.complainDescription}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Booking Count:</span>{" "}
                  {selectedUser.bookingCount}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Booking Time:</span>{" "}
                  {dayjs(selectedUser.bookingTime).format("DD/MM/YYYY hh:mm A")}
                  
                </p>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;

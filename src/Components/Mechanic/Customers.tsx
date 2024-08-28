import React, { useLayoutEffect, useState } from "react";
import {
  FaSearch,
  FaUser,
 
  FaEye,
} from "react-icons/fa";
import { useAppSelector } from "../../app/store";
import { fetchUsers } from "../../Api/mechanic";

interface User {
  [x: string]: any;
  name: string;
  email: string;
  phone: string;
  status: string;
  subscribed: boolean;
  blocked: boolean;
  bookingCount?: number;
  id: string;
}

const Customers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);

  useLayoutEffect(() => {
    const fetchMechanicData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          const result = await fetchUsers(mechanicData.mechnicId);
          setUsers(result.data); 
          console.log("hai",users);
        } catch (error) {
          console.error("Failed to fetch mechanic data:", error);
        }
      }
    };

    fetchMechanicData();
  }, [mechanicData]);

  

  return (
    <div className="container mx-auto px-3">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
      </div>

      <div className="mb-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="relative">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left min-w-[150px]">Name</th>
                <th className="px-4 py-2 text-left min-w-[200px]">Email</th>
                <th className="px-4 py-2 text-left min-w-[150px]">Phone</th>
                <th className="px-4 py-2 text-left min-w-[100px]">Status</th>
                <th className="px-4 py-2 text-left min-w-[150px]">
                  Booking Count
                </th>
                <th className="px-4 py-2 text-left min-w-[100px]">Details</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2 flex items-center">
                    <FaUser className="w-5 h-5 text-blue-500 mr-2" />
                    {user.name}
                  </td>
                  <td className="px-4 py-2">{user.user.email}</td>
                  <td className="px-4 py-2">{user.user.phone}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        user.status === "Active"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{user.bookingCount || 0}</td>
                  <td className="px-4 py-2">
                    <button className="py-1 px-3 rounded-full text-xs font-semibold bg-blue-200 text-blue-600 hover:bg-blue-300">
                      <FaEye className="inline mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;

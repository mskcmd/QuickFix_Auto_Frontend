import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../app/store";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { fetchBookData } from "../../../Api/user";
import dayjs from "dayjs";

const BookingsContent: React.FC = () => {
  const userData = useAppSelector((state) => state.auth.userData);
  const id: any = userData?.userId;
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  const statuses = [
    "All",
    "Pending",
    "Completed",
    "Ongoing",
    "Upcoming",
    "Cancelled",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(
          "Fetching bookings for user ID:",
          id,
          "with status:",
          selectedStatus
        );
        const result = await fetchBookData(id, selectedStatus);
        console.log("Fetched data:", result);
        setBookings(result);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, [id, selectedStatus]);

  return (
    <div className="">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">My Bookings</h2>
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-gray-500">Manage your bookings</p>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center"
          >
            {selectedStatus}
            <ChevronUpDownIcon className="w-5 h-5 ml-2" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-900"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Booking Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Service
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date && Time
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: any) => (
              <tr key={booking.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {booking.mechanic.name}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {booking.serviceDetails}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {dayjs(booking.bookingTime).format("DD/MM/YYYY hh:mm A")}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold text-${
                      booking.status === "Completed"
                        ? "green"
                        : booking.status === "Cancelled"
                        ? "red"
                        : "orange"
                    }-900 leading-tight`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 bg-${
                        booking.status === "Completed"
                          ? "green"
                          : booking.status === "Cancelled"
                          ? "red"
                          : "orange"
                      }-200 opacity-50 rounded-full`}
                    ></span>
                    <span className="relative">{booking.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {booking.status === "Pending" ? (
                    <button className="text-red-600 hover:text-red-900">
                      Cancel
                    </button>
                  ) : (
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Chat
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsContent;

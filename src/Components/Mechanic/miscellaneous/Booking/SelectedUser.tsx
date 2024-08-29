import React from "react";
import { User } from "../../../Type/MType";
import dayjs from "dayjs";

interface SelectedUserProps {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

const SelectedUser: React.FC<SelectedUserProps> = ({ selectedUser, setSelectedUser }) => {
  if (!selectedUser) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50"
      id="my-modal"
    >
      <div className="relative p-8 border w-full max-w-xl shadow-lg rounded-lg bg-white">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">User Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Name:</span> {selectedUser.name}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Phone:</span> {selectedUser.phone}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Location:</span> {selectedUser.locationName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Service Details:</span> {selectedUser.serviceDetails}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Complaint Description:</span> {selectedUser.complainDescription}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Booking Count:</span> {selectedUser.bookingCount}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Booking Time:</span> {dayjs(selectedUser.bookingTime).format("DD/MM/YYYY hh:mm A")}
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
  );
};

export default SelectedUser;

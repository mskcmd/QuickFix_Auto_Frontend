import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import { fetchUsers, statusUpdate } from "../../Api/mechanic";
import Search from "./miscellaneous/Booking/Search";
import Table from "./miscellaneous/Booking/Table";
import SelectedUser from "./miscellaneous/Booking/SelectedUser";
import { User } from "../Type/MType";

const Customers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<string>("");
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          const result = await fetchUsers(mechanicData.mechnicId);
          setUsers(result);
        } catch (error) {
          console.error("Failed to fetch mechanic data:", error);
        }
      }
    };

    fetchMechanicData();
  }, [mechanicData, status]);

  const handleMapClick = (coordinates: [number, number]) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${coordinates[0]},${coordinates[1]}`,
      "_blank"
    );
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const result: any = await statusUpdate(userId, newStatus);
      setStatus(result);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      user?.phone?.includes(searchTerm)
  );

  function handleViewDetails(_user: User): void {
    setSelectedUser(_user);
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Booking Details</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Table
        users={filteredUsers}
        handleViewDetails={handleViewDetails}
        handleStatusChange={handleStatusChange}
        handleMapClick={handleMapClick}
      />
      {selectedUser && (
        <SelectedUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </div>
  );
};

export default Customers;

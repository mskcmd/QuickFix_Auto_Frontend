import React from "react";
import TableBody from "./TableBody";
import TableHeading from "./TableHeading ";
import { User } from "../../../Type/MType";

interface TableProps {
  users: User[];
  handleViewDetails: (user: User) => void;
  handleStatusChange: (userId: string, newStatus: string) => void;
  handleMapClick: (coordinates: [number, number]) => void;
}

const Table: React.FC<TableProps> = ({ users, handleViewDetails, handleStatusChange, handleMapClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeading />
          <TableBody
            users={users}
            handleViewDetails={handleViewDetails}
            handleStatusChange={handleStatusChange}
            handleMapClick={handleMapClick}
          />
        </table>
      </div>
    </div>
  );
};

export default Table;

import React, { useLayoutEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
} from "@nextui-org/react";

import { EyeIcon } from "lucide-react";
import { useAppSelector } from "../../../../app/store";
import { fetchUsers } from "../../../../Api/mechanic";

interface BookingUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl?: string;
}

interface Booking {
  _id: string;
  name: string;
  user: BookingUser;
}

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "PHONE", uid: "phone" },
  { name: "ACTIONS", uid: "actions" },
];

const UserTable: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);

  useLayoutEffect(() => {
    const fetchBookingsData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          const result = await fetchUsers(mechanicData.mechnicId);
          setBookings(result.slice(0, 3)); // Limit to first 3 bookings
        } catch (error) {
          console.error("Failed to fetch bookings data:", error);
        }
      }
    };

    fetchBookingsData();
  }, [mechanicData]);

  const renderCell = React.useCallback(
    (booking: Booking, columnKey: React.Key) => {
      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: booking.user.imageUrl }}
              name={booking.name}
            >
              {booking.user.email}
            </User>
          );
        case "email":
          return booking.user.email;
        case "phone":
          return booking.user.phone;
        case "actions":
          return (
            <div className="relative flex items-end gap-2 justify-center">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    []
  );

  return (
    <div className="container mx-auto px-3">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
      </div>

      <Table aria-label="Customers table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column?.uid === "actions" ? "center" : "start"}
            >
              {column?.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={bookings}>
          {(item) => (
            <TableRow key={item?._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;

import React, { useLayoutEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { useAppSelector } from "../../app/store";
import { fetchUsers } from "../../Api/mechanic";
import { EyeIcon } from "lucide-react";

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
  status: string;
  bookingTime: string;
  user: BookingUser;
}

const statusColorMap = {
  Upcoming: "warning",
  Pending: "primary",
  Completed: "success",
  Cancelled: "danger",
} as const; // Added 'as const' for literal types

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "PHONE", uid: "phone" },
  { name: "STATUS", uid: "status" },
];

const Customers: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);

  useLayoutEffect(() => {
    const fetchBookingsData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          const result = await fetchUsers(mechanicData.mechnicId);
          setBookings(result);
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
              // description={booking.user.email}
              name={booking.name}
            >
              {booking.user.email}
            </User>
          );
        case "email":
          return booking.user.email;
        case "phone":
          return booking.user.phone;
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[booking.status as keyof typeof statusColorMap]
              }
              size="sm"
              variant="flat"
            >
              {booking.status}
            </Chip>
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

export default Customers;

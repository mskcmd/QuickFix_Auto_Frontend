import React, { useState, useEffect, useCallback } from "react";
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
  Button,
  Spinner,
} from "@nextui-org/react";
import { blockUser, getUseRData } from "../../Api/admin";

interface UserData {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  isVerified: boolean;
  isBlocked: boolean;
  _id: string;
}

const statusColorMap: Record<string, "success" | "danger"> = {
  active: "success",
  inactive: "danger",
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "PHONE", uid: "phone" },
  { name: "STATUS", uid: "status" },
  { name: "SUBSCRIBED", uid: "subscribed" },
  { name: "ACTIONS", uid: "actions" },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [block, setBlock] = useState<boolean>(false);
  const [loadingUsers, setLoadingUsers] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUseRData();
        if (response && response.data) {
          setUsers(response.data);
        } else {
          console.warn("No data found in response");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [block]);

  const handleBlockUser = useCallback(async (userId: string) => {
    setLoadingUsers((prev) => ({ ...prev, [userId]: true }));
    try {
      const result = await blockUser(userId);
      setBlock(result.isBlocked);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: result.isBlocked } : user
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUsers((prev) => ({ ...prev, [userId]: false }));
    }
  }, []);

  const renderCell = useCallback(
    (user: UserData, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof UserData];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: `${user.imageUrl}`,
              }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.isBlocked ? "inactive" : "active"]}
              size="sm"
              variant="flat"
            >
              {user.isBlocked ? "Inactive" : "Active"}
            </Chip>
          );
        case "subscribed":
          return (
            <Chip
              className="capitalize"
              color={user.isVerified ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {user.isVerified ? "Subscribed" : "Not Subscribed"}
            </Chip>
          );
        case "actions":
          return (
            <div>
              <Tooltip content={user.isBlocked ? "Unblock user" : "Block user"}>
                <Button
                  color={user.isBlocked ? "success" : "danger"}
                  size="sm"
                  onClick={() => handleBlockUser(user._id)}
                  disabled={loadingUsers[user._id]}
                >
                  {loadingUsers[user._id] ? (
                    <Spinner size="sm" color="white" />
                  ) : user.isBlocked ? (
                    "Unblock"
                  ) : (
                    "Block"
                  )}
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [loadingUsers, handleBlockUser]
  );

  return (
    <div className="container mx-auto px-3">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
      </div>

      <Table aria-label="User management table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.email}>
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

export default Users;

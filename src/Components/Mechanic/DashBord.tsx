// import React from "react";
// import { Bar, Doughnut, Line, Radar, Scatter } from "react-chartjs-2";
// import { Chart as ChartJS, registerables } from "chart.js";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
//   Chip,
//   Tooltip,
// } from "@nextui-org/react";
// import {
//   EyeIcon,
//   TrendingUpIcon,
//   UsersIcon,
//   CreditCardIcon,
//   ActivityIcon,
//   DollarSignIcon,
// } from "lucide-react";

// ChartJS.register(...registerables);

// type Status = "active" | "paused" | "vacation";

// interface UserData {
//   id: number;
//   name: string;
//   role: string;
//   team: string;
//   status: Status;
//   age: string;
//   avatar: string;
//   email: string;
// }

// const statusColorMap: Record<Status, "success" | "danger" | "warning"> = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// const columns = [
//   { name: "NAME", uid: "name" },
//   { name: "ROLE", uid: "role" },
//   { name: "STATUS", uid: "status" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// const users: UserData[] = [
//   {
//     id: 1,
//     name: "Tony Reichert",
//     role: "CEO",
//     team: "Management",
//     status: "active",
//     age: "29",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     email: "tony.reichert@example.com",
//   },
//   {
//     id: 2,
//     name: "Zoey Lang",
//     role: "Tech Lead",
//     team: "Development",
//     status: "paused",
//     age: "25",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//     email: "zoey.lang@example.com",
//   },
//   {
//     id: 3,
//     name: "Jane Fisher",
//     role: "Sr. Dev",
//     team: "Development",
//     status: "active",
//     age: "22",
//     avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//     email: "jane.fisher@example.com",
//   },
//   {
//     id: 4,
//     name: "William Howard",
//     role: "Community Manager",
//     team: "Marketing",
//     status: "vacation",
//     age: "28",
//     avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//     email: "william.howard@example.com",
//   },
//   {
//     id: 5,
//     name: "Kristen Copper",
//     role: "Sales Manager",
//     team: "Sales",
//     status: "active",
//     age: "24",
//     avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//     email: "kristen.cooper@example.com",
//   },
// ];

// const monthlyRevenue = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "Monthly Revenue",
//       data: [12000, 19000, 3000, 5000, 2000, 3000],
//       backgroundColor: "rgba(99, 102, 241, 0.6)",
//       borderColor: "rgb(99, 102, 241)",
//       borderWidth: 2,
//     },
//   ],
// };

// const userGrowth = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "User Growth",
//       data: [100, 120, 150, 170, 180, 170],
//       borderColor: "rgb(16, 185, 129)",
//       backgroundColor: "rgba(16, 185, 129, 0.5)",
//       tension: 0.4,
//     },
//   ],
// };

// const paymentMethods = {
//   labels: ["Credit Card", "PayPal", "Bank Transfer", "Cash"],
//   datasets: [
//     {
//       data: [300, 50, 100, 20],
//       backgroundColor: [
//         "rgba(239, 68, 68, 0.6)",
//         "rgba(59, 130, 246, 0.6)",
//         "rgba(245, 158, 11, 0.6)",
//         "rgba(16, 185, 129, 0.6)",
//       ],
//     },
//   ],
// };

// const userEngagement = {
//   labels: ["Likes", "Comments", "Shares", "Views", "Clicks"],
//   datasets: [
//     {
//       label: "User Engagement",
//       data: [65, 59, 90, 81, 56],
//       backgroundColor: "rgba(99, 102, 241, 0.2)",
//       borderColor: "rgb(99, 102, 241)",
//       pointBackgroundColor: "rgb(99, 102, 241)",
//       pointBorderColor: "#fff",
//       pointHoverBackgroundColor: "#fff",
//       pointHoverBorderColor: "rgb(99, 102, 241)",
//     },
//   ],
// };

// const customerLifetime = {
//   datasets: [
//     {
//       label: "Customer Lifetime Value",
//       data: [
//         { x: 1, y: 1000 },
//         { x: 2, y: 2000 },
//         { x: 3, y: 3000 },
//         { x: 4, y: 4000 },
//         { x: 5, y: 5000 },
//       ],
//       backgroundColor: "rgba(16, 185, 129, 0.6)",
//       borderColor: "rgb(16, 185, 129)",
//     },
//   ],
// };

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: "bottom" as const,
//     },
//   },
// };

// function Dashboard() {
//   const renderCell = React.useCallback(
//     (user: UserData, columnKey: React.Key) => {
//       const cellValue = user[columnKey as keyof UserData];

//       switch (columnKey) {
//         case "name":
//           return (
//             <User
//               avatarProps={{ radius: "lg", src: user.avatar }}
//               description={user.email}
//               name={cellValue}
//             >
//               {user.email}
//             </User>
//           );
//         case "role":
//           return (
//             <div className="flex flex-col">
//               <p className="text-bold text-sm capitalize">{cellValue}</p>
//               <p className="text-bold text-sm capitalize text-default-400">
//                 {user.team}
//               </p>
//             </div>
//           );
//         case "status":
//           return (
//             <Chip
//               className="capitalize"
//               color={statusColorMap[user.status]}
//               size="sm"
//               variant="flat"
//             >
//               {cellValue}
//             </Chip>
//           );
//         case "actions":
//           return (
//             <div className="">
//               <Tooltip content="Details">
//                 <span className="">
//                   <EyeIcon size={20} />
//                 </span>
//               </Tooltip>
//             </div>
//           );
//         default:
//           return cellValue;
//       }
//     },
//     []
//   );

//   return (
//     <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
//       <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
//         Analytics Dashboard
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
//               Monthly Revenue
//             </h2>
//             <TrendingUpIcon
//               className="text-indigo-500"
//               size={24}
//               sm:size={28}
//             />
//           </div>
//           <div className="h-64 sm:h-96">
//             <Bar data={monthlyRevenue} options={chartOptions} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
//               User Growth
//             </h2>
//             <UsersIcon className="text-green-500" size={24} sm:size={28} />
//           </div>
//           <div className="h-64 sm:h-96">
//             <Line data={userGrowth} options={chartOptions} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
//               Payment Methods
//             </h2>
//             <CreditCardIcon className="text-blue-500" size={24} sm:size={28} />
//           </div>
//           <div className="h-64">
//             <Doughnut data={paymentMethods} options={chartOptions} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
//               User Engagement
//             </h2>
//             <ActivityIcon className="text-purple-500" size={24} sm:size={28} />
//           </div>
//           <div className="h-64">
//             <Radar data={userEngagement} options={chartOptions} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
//               Customer Lifetime Value
//             </h2>
//             <DollarSignIcon
//               className="text-yellow-500"
//               size={24}
//               sm:size={28}
//             />
//           </div>
//           <div className="h-64">
//             <Scatter data={customerLifetime} options={chartOptions} />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 sm:mb-8 transition-all duration-300 hover:shadow-lg">
//         <h2 className="text-xl sm:text-2xl font-semibold p-4 sm:p-6 bg-gray-50 border-b text-gray-700">
//           Recent Users
//         </h2>
//         <Table aria-label="Example table with custom cells">
//           <TableHeader columns={columns}>
//             {(column) => (
//               <TableColumn
//                 key={column.uid}
//                 align={column.uid === "actions" ? "center" : "start"}
//               >
//                 {column.name}
//               </TableColumn>
//             )}
//           </TableHeader>
//           <TableBody items={users}>
//             {(item) => (
//               <TableRow key={item.id}>
//                 {(columnKey) => (
//                   <TableCell>{renderCell(item, columnKey)}</TableCell>
//                 )}
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { MonthlyRevenueChart } from "./miscellaneous/DashBord/MonthlyRevenueChart";
import { UserGrowthChart } from "./miscellaneous/DashBord/UserGrowthChart";
import { PaymentMethodsChart } from "./miscellaneous/DashBord/paymentMethods ";
import { CustomerLifetimeValueChart } from "./miscellaneous/DashBord/customerLifetime";
import UserTable from "./miscellaneous/DashBord/UserTable";

function Dashboard() {
  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <MonthlyRevenueChart />
        <CustomerLifetimeValueChart />
        <PaymentMethodsChart />
        <UserGrowthChart />
      </div>

      <UserTable />
    </div>
  );
}

export default Dashboard;

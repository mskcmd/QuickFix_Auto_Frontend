import React, { useEffect, useState } from "react";
import { Users, Wrench, FileText, Contact } from "lucide-react";
import { StatCard } from "../../Components/Admin/DashBord/StatCard";
import { MonthlyOverview } from "../../Components/Admin/DashBord/MonthlyOverview";
import { DailyActiveUsers } from "../../Components/Admin/DashBord/DailyActiveUsers";
import { RecentReports } from "../../Components/Admin/DashBord/RecentReports";
import { MechanicServices } from "../../Components/Admin/DashBord/MechanicServices";
import { monthlyDatas } from "../../Api/admin";



const dailyData = [
  { name: "Mon", active: 4000 },
  { name: "Tue", active: 3000 },
  { name: "Wed", active: 2000 },
  { name: "Thu", active: 2780 },
  { name: "Fri", active: 1890 },
  { name: "Sat", active: 2390 },
  { name: "Sun", active: 3490 },
];

const mechanicsData = [
  { name: "Repairs", value: 400 },
  { name: "Maintenance", value: 300 },
  { name: "Inspections", value: 200 },
  { name: "Consultations", value: 100 },
];

const Dashboard: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<any>([]);
  const monthlyData1 = async () => {
    try {
      const result = await monthlyDatas();
      setMonthlyData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    monthlyData1();
  }, []);

  const total: any = monthlyData.reduce(
    (
      acc: { users: any; mechanics: any },
      curr: { users: any; mechanics: any }
    ) => {
      acc.users += curr.users;
      acc.mechanics += curr.mechanics;
      return acc;
    },
    { users: 0, mechanics: 0 }
  );

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={total.users}
          icon={Users}
          trend={2.5}
        />
        <StatCard
          title="Active Mechanics"
          value={total.users}
          icon={Wrench}
          trend={1.8}
        />
        <StatCard title="Reports" value="23" icon={FileText} trend={5.1} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <MonthlyOverview data={monthlyData} />
        <DailyActiveUsers data={dailyData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RecentReports />
        <MechanicServices data={mechanicsData} />
      </div>
    </div>
  );
};

export default Dashboard;

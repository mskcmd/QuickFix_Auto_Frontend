import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { UsersIcon } from "lucide-react";
import { useAppSelector } from "../../../../app/store";
import { userGrowths } from "../../../../Api/mechanic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export function UserGrowthChart() {
  // Access Redux store
  const mechanicData: any = useAppSelector((state) => state.auth.mechanicData);
  const id: string = mechanicData?.data?._id || "";
  const [userGrowthData, setUserGrowthData] = useState<number[]>(
    Array(12).fill(0)
  );

  const fetchUserGrowth = async () => {
    try {
      const result = await userGrowths(id);
      setUserGrowthData(result);
    } catch (error) {
      console.error("Error fetching user growth data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserGrowth();
    }
  }, [id]);

  const userGrowth = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "User Growth",
        data: userGrowthData,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Users",
        },
      },
    },
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          User Growth
        </h2>
        <UsersIcon className="text-green-500" size={24} />
      </div>
      <div className="h-64 sm:h-96">
        <Line data={userGrowth} options={lineOptions} />
      </div>
    </div>
  );
}

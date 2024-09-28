import React, { useEffect, useState } from "react";
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
import { Bar } from "react-chartjs-2";
import { TrendingUpIcon } from "lucide-react";
import { useAppSelector } from "../../../../app/store";
import { fetchRevenue } from "../../../../Api/mechanic";

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

export function MonthlyRevenueChart() {
  const mechanicData: any = useAppSelector((state) => state.auth.mechanicData);
  const id: string = mechanicData?.data?._id || "";
  const [revenueData, setRevenueData] = useState<number[]>(Array(12).fill(0));

  const fetchMonthlyRevenue = async () => {
    try {
      const result = await fetchRevenue(id);
      setRevenueData(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMonthlyRevenue();
    }
  }, [id]);

  const monthlyRevenue = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueData,
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
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
          text: 'Revenue'
        }
      }
    }
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          Monthly Revenue
        </h2>
        <TrendingUpIcon className="text-indigo-500" size={24} />
      </div>
      <div className="h-64 sm:h-96">
        <Bar data={monthlyRevenue} options={barOptions} />
      </div>
    </div>
  );
}
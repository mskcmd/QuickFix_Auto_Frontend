import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import {  Radar } from "react-chartjs-2";
import { ActivityIcon } from "lucide-react";

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

// User Engagement Chart
const userEngagement = {
  labels: ["Likes", "Comments", "Shares", "Views", "Clicks"],
  datasets: [
    {
      label: "User Engagement",
      data: [65, 59, 90, 81, 56],
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      borderColor: "rgb(99, 102, 241)",
      pointBackgroundColor: "rgb(99, 102, 241)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(99, 102, 241)",
    },
  ],
};

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

export function UserEngagementChart() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          User Engagement
        </h2>
        <ActivityIcon className="text-purple-500" size={24} />
      </div>
      <div className="h-64">
        <Radar data={userEngagement} options={radarOptions} />
      </div>
    </div>
  );
}


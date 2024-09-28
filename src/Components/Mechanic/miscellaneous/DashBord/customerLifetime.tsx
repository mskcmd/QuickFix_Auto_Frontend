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
import { Scatter } from "react-chartjs-2";
import { DollarSignIcon } from "lucide-react";

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

// const 

const customerLifetime = {
  datasets: [
    {
      label: "Customer Lifetime Value",
      data: [
        { x: 1, y: 1000 },
        { x: 2, y: 2000 },
        { x: 3, y: 3000 },
        { x: 4, y: 4000 },
        { x: 5, y: 5000 },
      ],
      backgroundColor: "rgba(16, 185, 129, 0.6)",
      borderColor: "rgb(16, 185, 129)",
    },
  ],
};

const scatterOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "linear",
      position: "bottom",
    },
    y: {
      type: "linear",
      position: "left",
    },
  },
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

export function CustomerLifetimeValueChart() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          Customer Lifetime Value
        </h2>
        <DollarSignIcon className="text-yellow-500" size={24} />
      </div>
      <div className="h-96">
        <Scatter data={customerLifetime} options={scatterOptions} />
      </div>
    </div>
  );
}

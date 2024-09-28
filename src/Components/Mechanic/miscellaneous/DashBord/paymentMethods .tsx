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
import { Doughnut } from "react-chartjs-2";
import { CreditCardIcon } from "lucide-react";

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

const paymentMethods = {
  labels: ["Credit Card", "PayPal", "Bank Transfer", "Cash"],
  datasets: [
    {
      data: [300, 50, 100, 20],
      backgroundColor: [
        "rgba(239, 68, 68, 0.6)",
        "rgba(59, 130, 246, 0.6)",
        "rgba(245, 158, 11, 0.6)",
        "rgba(16, 185, 129, 0.6)",
      ],
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

export function PaymentMethodsChart() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          Payment Methods
        </h2>
        <CreditCardIcon className="text-blue-500" size={24} />
      </div>
      <div className="h-64">
        <Doughnut data={paymentMethods} options={doughnutOptions} />
      </div>
    </div>
  );
}

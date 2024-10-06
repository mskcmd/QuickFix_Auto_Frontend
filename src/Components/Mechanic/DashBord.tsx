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

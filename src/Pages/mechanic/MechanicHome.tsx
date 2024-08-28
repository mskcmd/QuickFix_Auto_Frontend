import Header from "../../Components/Mechanic/Heder";
import Navigation from "../../Components/Mechanic/Navigation";
import { Outlet } from "react-router-dom";

function MechanicHome() {
  return (
    <>
    <div className="min-w-screen bg-gray-50">
      <Header />
      <Navigation />
      <main className="container mx-auto mt-8 px-4">
      <Outlet/>
      </main>
    </div>
    </>
  );
}

export default MechanicHome;
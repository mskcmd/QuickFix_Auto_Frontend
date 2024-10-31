import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaTools, FaStar, FaClock } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { RootState } from "../../app/store";
import Header from "../../Components/User/Header";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import BookingForm from "../../Components/User/UserCommen/BookingForm";
import { Calendar, Eye } from "lucide-react";

// Types
interface MechanicProfile {
  _id: string;
  specialization: string;
  distanceKm: number;
  type: string;
  profileImages: { url: string }[];
  workingHours: Array<{
    days: string[];
    startTime: string;
    endTime: string;
  }>;
  averageRating?: Array<{ averageRating: number }>; // Assuming averageRating is optional
}

// MechanicCard component
const MechanicCard: React.FC<{ mechanic: MechanicProfile }> = ({
  mechanic,
}) => {
  // Extract average rating safely
  const r =
    mechanic?.averageRating && mechanic.averageRating.length > 0
      ? mechanic.averageRating[0].averageRating
      : 0; // Default to 0 if not available

  const formatDays = (daysArray: string[]) => {
    if (daysArray.length === 0) return "Not specified";
    const days = JSON.parse(daysArray[0]);
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const sortedDays = days.sort(
      (a: string, b: string) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
    );

    if (sortedDays.length === 7) return "Mon-Sun";
    if (sortedDays.length === 6 && !sortedDays.includes("Sunday"))
      return "Mon-Sat";
    if (
      sortedDays.length === 5 &&
      sortedDays.includes("Monday") &&
      sortedDays.includes("Friday")
    )
      return "Mon-Fri";

    const firstDay = sortedDays[0].slice(0, 3);
    const lastDay = sortedDays[sortedDays.length - 1].slice(0, 3);
    return `${firstDay}-${lastDay}`;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hoursNum = parseInt(hours, 10);
    const ampm = hoursNum >= 12 ? "PM" : "AM";
    const formattedHours = hoursNum % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <Card>
      <CardBody>
        <img
          src={
            mechanic.profileImages[0]?.url ||
            "https://via.placeholder.com/300x150"
          }
          alt={`${mechanic.specialization} mechanic`}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <h2 className="text-lg font-semibold mt-2 mb-2 text-gray-800">
          {mechanic.specialization}
        </h2>
        <p className="flex items-center text-sm mb-1 text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-red-500" aria-hidden="true" />
          <span>{mechanic.distanceKm.toFixed(2)} km away</span>
        </p>
        <p className="flex items-center text-sm mb-2 text-gray-600">
          <FaTools className="mr-2 text-blue-500" aria-hidden="true" />
          <span>{mechanic.type}</span>
        </p>
        {mechanic.workingHours && mechanic.workingHours.length > 0 && (
          <p className="flex items-center text-sm mb-2 text-gray-600">
            <FaClock className="mr-2 text-green-500" aria-hidden="true" />
            <span>
              {formatDays(mechanic.workingHours[0].days)}:{" "}
              {formatTime(mechanic.workingHours[0].startTime)} -{" "}
              {formatTime(mechanic.workingHours[0].endTime)}
            </span>
          </p>
        )}
        <div
          className="flex items-center mb-3"
          aria-label={`Rating: ${r} out of 5 stars`}
        >
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`${
                i < r ? "text-yellow-400" : "text-gray-300"
              } w-4 h-4`}
              aria-hidden="true"
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">
            {r > 0 ? `(${r})` : "(No Ratings)"}{" "}
            {/* Updated to show a message when no ratings */}
          </span>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex space-x-2 w-full">
          <Button
            as={Link}
            to={`/mechanicData/${mechanic._id}`}
            className="flex-1"
            color="primary"
            startContent={<Eye size={16} />}
          >
            View Details
          </Button>

          <Link to={`/booking/${mechanic._id}`}>
            <Button
              color="success"
              className="flex-1"
              startContent={<Calendar size={16} />}
            >
              Book Now
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

const MechanicListingPage: React.FC = () => {
  const userSearchData = useSelector(
    (state: RootState) => state.auth.userSerchData
  ) as unknown as MechanicProfile[];
  const [filter, setFilter] = useState("All");
  const filteredData = userSearchData.filter(
    (mechanic) => filter === "All" || mechanic.type === filter.toLowerCase()
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-2">
          <section className="w-full lg:w-8/12">
            <Card>
              <CardBody>
                <div className="flex justify-center mb-4 space-x-2">
                  {["All", "Shop", "Company", "Freelancer"].map((option) => (
                    <Button
                      key={option}
                      color={filter === option ? "primary" : "default"}
                      onPress={() => setFilter(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredData.map((mechanic) => (
                    <motion.div
                      key={mechanic._id}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MechanicCard mechanic={mechanic} />
                    </motion.div>
                  ))}
                </motion.div>
              </CardBody>
            </Card>
          </section>

          <section className="w-full lg:w-4/12">
            <BookingForm />
          </section>
        </div>
      </main>
    </div>
  );
};

export default MechanicListingPage;

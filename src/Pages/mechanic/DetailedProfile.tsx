import React, { useEffect, useState } from "react";
import { getDetailesData } from "../../Api/mechanic";
import { useAppSelector } from "../../app/store";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTools,
  FaCertificate,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import Header from "../../Components/Mechanic/Heder";

interface MechanicDetailData {
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isSubscriber: boolean;
  isMechanic: boolean;
  mechanicData: {
    type: string;
    yearsOfExperience: number;
    locationName: string;
    description: string;
    licenseNumber: string;
    specialization: string;
    services: string[];
    profileImages: Array<{ url: string; contentType: string; _id: string }>;
    certificate: { url: string; contentType: string };
    workingHours: Array<{
      days: string[];
      startTime: string;
      endTime: string;
      _id: string;
    }>;
  };
}

const DetailedProfile: React.FC = () => {
  const [data, setData] = useState<MechanicDetailData | null>(null);
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          const result = await getDetailesData(mechanicData.mechnicId);
          setData(result[0]);
        } catch (error) {
          console.error("Failed to fetch mechanic data:", error);
        }
      }
    };

    fetchMechanicData();
  }, [mechanicData]);

  const formatDays = (daysArray: string[]) => {
    const days = JSON.parse(daysArray[0]);
    if (days.length === 7) return "Every day";
    if (days.length === 5 && days.includes("Monday") && days.includes("Friday")) return "Weekdays";
    if (days.length === 2 && days.includes("Saturday") && days.includes("Sunday")) return "Weekends";
    return days.join(", ");
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <img
              className="w-full h-64 object-cover"
              src={data.mechanicData.profileImages[0].url}
              alt={data.name}
            />
            <div className="absolute top-0 right-0 m-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {data.name}
                </h2>
                <p className="mt-2 text-xl text-gray-600">
                  {data.mechanicData.type}
                </p>
              </div>
              <div className="flex space-x-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    data.isVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {data.isVerified ? "Verified" : "Not Verified"}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    data.isSubscriber
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {data.isSubscriber ? "Subscriber" : "Non-Subscriber"}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <p className="flex items-center text-gray-600 mb-2">
                  <FaEnvelope className="mr-2" /> {data.email}
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <FaPhone className="mr-2" /> {data.phone}
                </p>
                <p className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />{" "}
                  {data.mechanicData.locationName}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Professional Details
                </h3>
                <p className="flex items-center text-gray-600 mb-2">
                  <FaTools className="mr-2" /> Specialization:{" "}
                  {data.mechanicData.specialization}
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <FaCertificate className="mr-2" /> License:{" "}
                  {data.mechanicData.licenseNumber}
                </p>
                <p className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2" /> Experience:{" "}
                  {data.mechanicData.yearsOfExperience} years
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                About
              </h3>
              <div
                className="text-gray-700 bg-gray-50 p-4 rounded-lg"
                dangerouslySetInnerHTML={{
                  __html: data.mechanicData.description,
                }}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Services
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.mechanicData.services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-center"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <FaClock className="mr-2 text-blue-500" /> Working Hours
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.mechanicData.workingHours.map((schedule, index) => (
                  <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                    <p className="font-medium text-lg text-gray-800 mb-2">
                      {formatDays(schedule.days)}
                    </p>
                    <p className="text-gray-600">
                      {schedule.startTime} - {schedule.endTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Gallery
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.mechanicData.profileImages.map((image, index) => (
                  <img
                    key={image._id}
                    src={image.url}
                    alt={`Gallery ${index + 1}`}
                    className="h-40 w-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Certificate
              </h3>
              {data.mechanicData.certificate?.url && (
                <a
                  href={data.mechanicData.certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  View Certificate
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedProfile;

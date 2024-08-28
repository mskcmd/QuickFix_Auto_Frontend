import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import Header from "../../Components/User/Header";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaTools,
  FaClock,
  FaStar,
  FaQuoteLeft,
  FaWrench,
  FaTimes,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

interface MechanicProfile {
  _id: string;
  name: string;
  specialization: string;
  locationName: string;
  drivingTime: number;
  yearsOfExperience: number;
  services: string[];
  profileImages: { url: string; contentType: string }[];
  description: string;
  workingHours: {
    days: string;
    startTime: string;
    endTime: string;
  }[];
  phoneNumber?: string;
  email?: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const MechanicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userSearchData = useAppSelector((state) => state.auth.userSerchData) as unknown as MechanicProfile[];
  const mechanic = userSearchData.find((m) => m._id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!mechanic) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center h-screen bg-gray-50"
      >
        <p className="text-2xl text-gray-600 font-light">Mechanic not found</p>
      </motion.div>
    );
  }

  const dummyReviews: Review[] = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Exceptional service! Fixed my car promptly and efficiently.",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "Very professional, knowledgeable, and courteous.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 5,
      comment: "Highly recommended. Outstanding work and customer service!",
    },
  ];

  const handleBooking = () => {
    console.log("Booking initiated for mechanic:", mechanic.name);
  };

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-gray-50 min-h-screen py-12"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-3xl overflow-hidden"
          >
            {/* Profile Image Section */}
            <div className="relative h-80 bg-gradient-to-r from-blue-500 to-purple-600">
              <img
                src={mechanic.profileImages[1]?.url || "/default-profile.jpg"}
                alt={`Profile of ${mechanic.name}`}
                className="h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-bold mb-2">{mechanic.name}</h1>
                <p className="text-2xl font-semibold">{mechanic.specialization}</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-20">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-lg"
                >
                  <img
                    src={mechanic.profileImages[0]?.url || "/default-profile.jpg"}
                    alt={`Profile of ${mechanic.name}`}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-8 pt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">About Me</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {mechanic.description}
                </p>
                <div className="space-y-4">
                  <InfoItem
                    icon={<FaMapMarkerAlt className="text-blue-500" />}
                    text={mechanic.locationName}
                  />
                  <InfoItem
                    icon={<FaClock className="text-green-500" />}
                    text={`${mechanic.drivingTime} minutes driving time`}
                  />
                  <InfoItem
                    icon={<FaTools className="text-purple-500" />}
                    text={`${mechanic.yearsOfExperience} years of experience`}
                  />
                  {mechanic.phoneNumber && (
                    <InfoItem
                      icon={<FaPhone className="text-red-500" />}
                      text={mechanic.phoneNumber}
                    />
                  )}
                  {mechanic.email && (
                    <InfoItem
                      icon={<FaEnvelope className="text-yellow-500" />}
                      text={mechanic.email}
                    />
                  )}
                </div>
                <WorkingHours workingHours={mechanic.workingHours} />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                  onClick={handleBooking}
                >
                  <FaCalendarAlt className="mr-2" />
                  Book Now
                </motion.button>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Services</h3>
                <div className="grid grid-cols-2 gap-4">
                  {mechanic.services.map((service, index) => (
                    <ServiceItem key={index} service={service} />
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="px-8 py-10 bg-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mechanic.profileImages.map((image, index) => (
                  <GalleryImage
                    key={index}
                    image={image}
                    onClick={() => setSelectedImage(image.url)}
                  />
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="px-8 py-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {dummyReviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Link
              to="/mechanicData"
              className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              Back to List
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  text: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, text }) => (
  <div className="flex items-center text-gray-700">
    <div className="mr-3 text-xl">{icon}</div>
    <span>{text}</span>
  </div>
);

interface WorkingHoursProps {
  workingHours: {
    days: string;
    startTime: string;
    endTime: string;
  }[];
}

const WorkingHours: React.FC<WorkingHoursProps> = ({ workingHours }) => {
  const parseDays = (days: string) => {
    try {
      const parsedDays = JSON.parse(days);
      return Array.isArray(parsedDays)
        ? parsedDays.join(", ")
        : days;
    } catch {
      return days;
    }
  };

  return (
    <div className="mt-8">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">Working Hours</h4>
      <ul className="list-disc list-inside">
        {workingHours.map((item, index) => (
          <li key={index} className="text-gray-700">
            {parseDays(item.days)}: {item.startTime} - {item.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ServiceItemProps {
  service: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service }) => (
  <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
    <FaWrench className="text-blue-600 text-3xl mr-4" />
    <span className="text-lg font-medium">{service}</span>
  </div>
);

interface GalleryImageProps {
  image: { url: string; contentType: string };
  onClick: () => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, onClick }) => (
  <div
    className="relative cursor-pointer overflow-hidden rounded-lg"
    onClick={onClick}
  >
    <img
      src={image.url}
      alt="Gallery image"
      className="w-full h-full object-cover"
    />
  </div>
);

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex items-center mb-2">
      <FaStar className="text-yellow-500 text-xl mr-2" />
      <span className="text-lg font-medium">{review.rating} stars</span>
    </div>
    <p className="text-gray-700">{review.comment}</p>
  </div>
);

interface ImageModalProps {
  image: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
    <div className="relative bg-white p-4 rounded-lg max-w-lg">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        <FaTimes className="text-2xl" />
      </button>
      <img src={image} alt="Selected" className="w-full h-auto" />
    </div>
  </div>
);

export default MechanicDetails;

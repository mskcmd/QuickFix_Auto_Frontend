import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import Header from "../../Components/User/Header";
import { motion, AnimatePresence } from "framer-motion";
import { fetchreview } from "../../Api/user";
import ProfileHeader from "../../Components/User/MechanicData/ProfileHeader";
import InfoSection from "../../Components/User/MechanicData/InfoSection";
import ServicesSection from "../../Components/User/MechanicData/ServicesSection";
import GallerySection from "../../Components/User/MechanicData/GallerySection";
import ReviewsSection from "../../Components/User/MechanicData/ReviewsSection";
import ImageModal from "../../Components/User/MechanicData/ImageModal";
import { MechanicProfile, Review } from "../../Components/User/MechanicData/Types";


const MechanicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userSearchData = useAppSelector((state) => state.auth.userSerchData) as unknown as MechanicProfile[];
  const mechanic = userSearchData.find((m) => m._id === id);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Review[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const reviewData = async () => {
      try {
        const result = await fetchreview(mechanic?.mechanicID);
        setFeedback(result);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    reviewData();
  }, [mechanic?.mechanicID]);

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

  const handleBooking = () => {
    navigate(`/booking/${mechanic._id}`);
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
            <ProfileHeader mechanic={mechanic} />
            <div className="p-8 pt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoSection mechanic={mechanic} onBooking={handleBooking} />
              <ServicesSection services={mechanic.services} />
            </div>
            <GallerySection images={mechanic.profileImages} onImageClick={setSelectedImage} />
            <ReviewsSection reviews={feedback} />
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
          <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default MechanicDetails;

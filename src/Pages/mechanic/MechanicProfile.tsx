import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Mechanic/Heder';
import Footer from '../../Components/User/Footer';
import { FaEnvelope, FaPhone, FaEdit, FaUserCircle } from 'react-icons/fa';
import { getmechData } from '../../Api/mechanic';
import { useAppSelector } from '../../app/store';

export type MechanicDataItem = {
  isCompleted: boolean;
  email: string;
  isBlocked: boolean;
  isMechanic: boolean;
  isSubscriber: boolean;
  isVerified: boolean;
  mechanicdataID: string;
  name: string;
  password: string;
  phone: string;
  __v: number;
  _id: string;
  profileImage?: string;
};

const BasicProfile: React.FC = () => {
  const [data, setData] = useState<MechanicDataItem | null>(null);
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          const result: MechanicDataItem[] = await getmechData(mechanicData.mechnicId);
          if (result.length > 0) {
            setData(result[0]);
          }
        } catch (error) {
          console.error("Failed to fetch mechanic data:", error);
        }
      }
    };

    fetchMechanicData();
  }, [mechanicData]);

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
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-['Poppins']">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:max-w-2xl transition-all duration-300 hover:shadow-2xl">
          <div className="md:flex flex-col items-center p-8">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-indigo-500 shadow-lg">
              {data?.profileImage ? (
                <img src={data.profileImage} alt={data.name} className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle className="w-full h-full text-indigo-500" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{data?.name}</h2>
            <div className="bg-indigo-100 px-3 py-1 rounded-full text-sm font-medium text-indigo-800 mb-4">
              {data?.isVerified ? 'Verified Mechanic' : 'Unverified Mechanic'}
            </div>
            <div className="w-full space-y-3 mb-6">
              <p className="text-gray-600 flex items-center justify-center">
                <FaEnvelope className="mr-2 text-indigo-500" /> {data?.email}
              </p>
              <p className="text-gray-600 flex items-center justify-center">
                <FaPhone className="mr-2 text-indigo-500" /> {data?.phone}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="detailedProfile" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                View Details
              </Link>
              <Link 
                to="/EditProfile" 
                className="inline-flex items-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BasicProfile;
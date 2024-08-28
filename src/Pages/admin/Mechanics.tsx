import React, { useLayoutEffect, useState } from 'react';
import { FaUser, FaLock, FaLockOpen, FaCheck, FaTimes, FaSearch, FaEye, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTools, FaBriefcase, FaCertificate, FaCalendarAlt } from 'react-icons/fa';
import Pagination from '../../Components/Admin/Commen/Pagination';
import { getMechData } from '../../Api/admin';

// Define TypeScript interfaces
interface Certificate {
  url: string;
  contentType: string;
}

interface ProfileImage {
  url: string;
  contentType: string;
  _id: string;
}

interface MechanicData {
  certificate: Certificate;
  createdAt: string;
  description: string;
  licenseNumber: string;
  location: string;
  locationName: string;
  mechanicID: string;
  profileImages: ProfileImage[];
  services: string[];
  specialization: string;
  type: string;
  updatedAt: string;
  yearsOfExperience: number;
  _id: string;
}

interface UserData {
  email: string;
  isBlocked: boolean;
  isCompleted: boolean;
  isMechanic: boolean;
  isSubscriber: boolean;
  isVerified: boolean;
  mechanicdataID: MechanicData;
  name: string;
  phone: string;
  _id: string;
}

const Mechanics: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const itemsPerPage = 8;

  useLayoutEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getMechData();
        if (response?.data) {
          setUsers(response.data);
        } else {
          console.warn('No data found in response');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleBlock = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers[index].isBlocked = !updatedUsers[index].isBlocked;
    setUsers(updatedUsers);
  };

  const handleViewDetails = (user: UserData) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Mechanic Management</h1>
      
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search mechanics..."
            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedUsers.map((user, index) => (
          <div key={user._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center mb-4">
              {user.mechanicdataID?.profileImages && user.mechanicdataID.profileImages.length > 0 ? (
                <img 
                  src={user.mechanicdataID.profileImages[0]?.url} 
                  alt={user.name} 
                  className="w-16 h-16 rounded-full mr-4 cursor-pointer hover:opacity-80 transition duration-300" 
                  onClick={() => handleImageClick(user.mechanicdataID.profileImages[0]?.url ?? '')}
                />
              ) : (
                <FaUser className="w-16 h-16 text-blue-500 mr-4" />
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.mechanicdataID?.specialization}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="flex items-center text-sm text-gray-600 mb-1"><FaEnvelope className="mr-2" />{user.email}</p>
              <p className="flex items-center text-sm text-gray-600"><FaPhone className="mr-2" />{user.phone}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
    user.isVerified ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
  }`}>
    {user.isVerified ? 'Verified' : 'Not Verified'}
  </span>
  {user.isSubscriber ? (
    <span className="text-xs font-semibold text-green-600">
      <FaCheck className="inline mr-1" />
      Subscribed
    </span>
  ) : user.isCompleted ? (
    <button 
      className="text-xs font-semibold  bg-green-200 text-green-700  px-3 py-1 rounded-full hover:bg-green-300-600 transition duration-300"
      onClick={() => {/* Add subscription logic here */}}
    >
      Subscribed
    </button>
  ) : (
    <span className="text-xs font-semibold text-red-600">
      <FaTimes className="inline mr-1" />
      Not Subscribed
    </span>
  )}
</div>
            <button 
              onClick={() => handleToggleBlock(index)}
              className={`w-full py-2 px-4 rounded-full text-sm font-semibold mb-2 transition duration-300 ${
                user.isBlocked 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {user.isBlocked ? (
                <>
                  <FaLockOpen className="inline mr-2" />
                  Unblock
                </>
              ) : (
                <>
                  <FaLock className="inline mr-2" />
                  Block
                </>
              )}
            </button>
            <button 
              onClick={() => handleViewDetails(user)}
              className="w-full py-2 px-4 rounded-full text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            >
              <FaEye className="inline mr-2" />
              View Details
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{selectedUser.name}'s Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="flex items-center mb-2"><FaEnvelope className="mr-2 text-blue-500" /><strong>Email:</strong> {selectedUser.email}</p>
                <p className="flex items-center mb-2"><FaPhone className="mr-2 text-blue-500" /><strong>Phone:</strong> {selectedUser.phone}</p>
                <p className="flex items-center mb-2"><FaLock className="mr-2 text-blue-500" /><strong>Blocked:</strong> {selectedUser.isBlocked ? 'Yes' : 'No'}</p>
                <p className="flex items-center mb-2"><FaCheck className="mr-2 text-blue-500" /><strong>Completed:</strong> {selectedUser.isCompleted ? 'Yes' : 'No'}</p>
                <p className="flex items-center mb-2"><FaTools className="mr-2 text-blue-500" /><strong>Mechanic:</strong> {selectedUser.isMechanic ? 'Yes' : 'No'}</p>
                <p className="flex items-center mb-2"><FaCheck className="mr-2 text-blue-500" /><strong>Subscriber:</strong> {selectedUser.isSubscriber ? 'Yes' : 'No'}</p>
                <p className="flex items-center mb-2"><FaCheck className="mr-2 text-blue-500" /><strong>Verified:</strong> {selectedUser.isVerified ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="flex items-center mb-2"><FaCertificate className="mr-2 text-blue-500" /><strong>License Number:</strong> {selectedUser.mechanicdataID?.licenseNumber}</p>
                <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2 text-blue-500" /><strong>Location:</strong> {selectedUser.mechanicdataID?.locationName}</p>
                <p className="flex items-center mb-2"><FaTools className="mr-2 text-blue-500" /><strong>Specialization:</strong> {selectedUser.mechanicdataID?.specialization}</p>
                <p className="flex items-center mb-2"><FaBriefcase className="mr-2 text-blue-500" /><strong>Type:</strong> {selectedUser.mechanicdataID?.type}</p>
                <p className="flex items-center mb-2"><FaCalendarAlt className="mr-2 text-blue-500" /><strong>Years of Experience:</strong> {selectedUser.mechanicdataID?.yearsOfExperience}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Description:</h3>
              <div dangerouslySetInnerHTML={{ __html: selectedUser.mechanicdataID?.description ?? '' }} className="bg-gray-100 p-4 rounded-lg" />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Services:</h3>
              <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg">
                {JSON.parse(selectedUser.mechanicdataID?.services?.[0] ?? '[]').map((service: string, index: number) => (
                  <li key={index} className="mb-1">{service}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Profile Images:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedUser.mechanicdataID?.profileImages?.map((image, index) => (
                  <img 
                    key={index} 
                    src={image.url} 
                    alt={`Profile ${index + 1}`} 
                    className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition duration-300" 
                    onClick={() => handleImageClick(image.url)}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Certificate:</h3>
              <a href={selectedUser.mechanicdataID?.certificate?.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:underline">
                <FaCertificate className="mr-2" />
                View Certificate
              </a>
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl w-full">
            <img src={selectedImage} alt="Profile" className="w-full h-auto rounded-lg" />
            <button 
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 transition duration-300"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mechanics;
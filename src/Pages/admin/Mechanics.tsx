import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../Components/Admin/Commen/Pagination";
import { getMechData, handlemechBlock } from "../../Api/admin";
import { MechanicCard } from "../../Components/Admin/Mechanics/MechanicCard";
import { UserData } from "../../Components/Admin/Mechanics/Mechanics";
import { UserDetailsModal } from "../../Components/Admin/Mechanics/UserDetailsModal";
import { ImageModal } from "../../Components/Admin/Mechanics/ImageModal";

const Mechanics: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [block, setBlock] = useState<boolean>(false);
  const itemsPerPage = 8;

  const fetchUsers = async () => {
    try {
      const response = await getMechData();
      if (response?.data) {
        setUsers(response.data);
      } else {
        console.warn("No data found in response");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [block]);

  const handleToggleBlock = async (index: any) => {
    try {
      const result = await handlemechBlock(index);
      console.log(result);
      setBlock(!block);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDetails = (user: UserData) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Mechanic Management
      </h1>

      {/* Search Bar */}
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
      <>
        {/* Mechanic Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedUsers.map((user, index) => (
            <MechanicCard
              key={user._id}
              user={user}
              index={index}
              onToggleBlock={handleToggleBlock}
              onViewDetails={handleViewDetails}
              onImageClick={handleImageClick}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
          onImageClick={handleImageClick}
        />
      )}

      {/* Image Modal */}
      {showImageModal && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </div>
  );
};

export default Mechanics;

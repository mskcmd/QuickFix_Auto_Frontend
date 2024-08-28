import React, { useState, useRef, useLayoutEffect } from 'react';
import { FaUser, FaLock, FaLockOpen, FaCheck, FaTimes, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Pagination from '../../Components/Admin/Commen/Pagination';
import { getUseRData } from '../../Api/admin';

interface User {
    email: string;
    isUser: boolean;
    isVerified: boolean;
    isBlocked:boolean;
    name: string;
    phone: string;
}


const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
       
    ]); 

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8;
  const tableRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUseRData();
        
        if (response && response.data) {
          console.log(response.data);
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
    updatedUsers[index].isVerified = !updatedUsers[index].isVerified;
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const scroll = (direction: 'left' | 'right') => {
    if (tableRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      tableRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="container mx-auto px-3">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
       
      </div>
      
      <div className="mb-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="relative">
        <div className="overflow-x-auto" ref={tableRef}>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left min-w-[150px]">Name</th>
                <th className="px-4 py-2 text-left min-w-[200px]">Email</th>
                <th className="px-4 py-2 text-left min-w-[150px]">Phone</th>
                <th className="px-4 py-2 text-left min-w-[100px]">Status</th>
                <th className="px-4 py-2 text-left min-w-[150px]">Subscribed</th>
                <th className="px-4 py-2 text-left min-w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 flex items-center">
                    <FaUser className="w-5 h-5 text-blue-500 mr-2" />
                    {user.name}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      user.isVerified === true ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'
                    }`}>
                      {user.isVerified?"active":"unactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {user.isVerified ? (
                      <span className="text-green-600">
                        <FaCheck className="inline mr-1" />
                        Subscribed
                      </span>
                    ) : (
                      <span className="text-red-600">
                        <FaTimes className="inline mr-1" />
                        Not Subscribed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => handleToggleBlock(index)}
                      className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        user.isVerified 
                          ? 'bg-green-200 text-green-600 hover:bg-green-300' 
                          : 'bg-red-200 text-red-600 hover:bg-red-300'
                      }`}
                    >
                      {user.isBlocked ? (
                        <>
                          <FaLockOpen className="inline mr-1" />
                          Unblock
                        </>
                      ) : (
                        <>
                          <FaLock className="inline mr-1" />
                          Block
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Users;
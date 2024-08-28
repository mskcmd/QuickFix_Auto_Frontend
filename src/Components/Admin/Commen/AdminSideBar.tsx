import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaWrench, FaSubscript, FaUser } from 'react-icons/fa';
import { useAdmin } from '../../../app/Hooks/AdminContext';

const Sidebar: React.FC = () => {
  const { admin } = useAdmin();

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gray-600 p-2 rounded-full">
            <FaUser size={24} />
          </div>
          <div>
            <p className="font-semibold">{admin.name}</p>
            <p className="text-sm text-gray-400">{admin.role}</p>
          </div>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard/dashboard"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard/users"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
            >
              <FaUsers />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard/mechanics"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
            >
              <FaWrench />
              <span>Mechanics</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard/subscriptions"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
            >
              <FaSubscript />
              <span>Subscriptions</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
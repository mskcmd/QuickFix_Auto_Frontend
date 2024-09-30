import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, CreditCard, User, X ,Wrench } from 'lucide-react';
import { useAdmin } from '../../../app/Hooks/AdminContext';

interface SidebarProps {
  isOpen: boolean;
  isSmallScreen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isSmallScreen, toggleSidebar }) => {
  const { admin } = useAdmin();

  return (
    <aside className={`
      bg-gray-800 text-white w-64 min-h-screen p-4 
      transition-all duration-300 ease-in-out
      ${isSmallScreen ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
      ${isSmallScreen ? 'fixed' : 'relative'} z-30
    `}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        {isSmallScreen && (
          <button 
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <X size={24} />
          </button>
        )}
      </div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gray-600 p-2 rounded-full">
          <User size={24} />
        </div>
        <div>
          <p className="font-semibold">{admin.name}</p>
          <p className="text-sm text-gray-400">{admin.role}</p>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          <SidebarLink to="/admin/dashboard/dashboard" icon={<Home size={20} />} text="Dashboard" />
          <SidebarLink to="/admin/dashboard/users" icon={<Users size={20} />} text="Users" />
          <SidebarLink to="/admin/dashboard/mechanics" icon={<Wrench  size={20} />} text="Mechanics" />
          <SidebarLink to="/admin/dashboard/subscriptions" icon={<CreditCard size={20} />} text="Subscriptions" />
        </ul>
      </nav>
    </aside>
  );
};

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => (
  <li>
    <Link
      to={to}
      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 transition-colors duration-200"
    >
      {icon}
      <span>{text}</span>
    </Link>
  </li>
);

export default Sidebar;
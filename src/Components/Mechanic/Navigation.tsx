import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-center mt-2">
      <nav className="bg-gradient-to-r from-gray-900 to-blue-950 w-full md:w-[80%] shadow-lg rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <span className="text-white font-bold">Menu</span>
          </div>
          <ul className={`md:flex md:justify-between md:items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
            <li className="relative group">
              <Link to="/mechanic/home/dashbord" className="block px-4 py-3 transition duration-300 ease-in-out text-blue-100 hover:text-white">
                Dashboard
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li className="relative group">
              <Link to="/mechanic/home/customers" className="block px-4 py-3 transition duration-300 ease-in-out text-blue-100 hover:text-white">
                Customers
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li className="relative group">
              <Link to="/mechanic/service" className="block px-4 py-3 transition duration-300 ease-in-out text-blue-100 hover:text-white">
                Service
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li className="relative group">
              <Link to="/mechanic/home/bookings" className="block px-4 py-3 transition duration-300 ease-in-out text-blue-100 hover:text-white">
                Bookings
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li className="relative group">
              <Link to="/mechanic/payments" className="block px-4 py-3 transition duration-300 ease-in-out text-blue-100 hover:text-white">
                Payments
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
            <li className="relative group">
              <Link to="/mechanic/blog" className="block px-4 py-3 transition duration-300 ease-in-out text-blue-100 hover:text-white">
                Blog
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100"></span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
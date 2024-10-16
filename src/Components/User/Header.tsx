import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { useDispatch } from "react-redux";
import { userLogout } from "../../app/slice/AuthSlice";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { logout } from "../../Api/user";
import { FaHome, FaCogs, FaBlog, FaBars, FaTimes, FaComments, FaUser, FaCog } from "react-icons/fa";
import { FiLogOut, FiMessageCircle, FiUser } from "react-icons/fi";
import Logo from "../../../public/Service/Logo1.png";

const Header: React.FC = () => {
  const userData = useAppSelector((state) => state.auth.userData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout().then(() => console.log("User logged out"));
        dispatch(userLogout());
        navigate("/login");
        toast.success("You are logged out!");
      }
    });
  };

  const NavLink: React.FC<{ to: string; icon: React.ElementType; children: React.ReactNode }> = ({ to, icon: Icon, children }) => (
    <Link to={to} className="flex items-center hover:text-purple-400 transition-all duration-300">
      <Icon className="mr-1" />
      <span>{children}</span>
    </Link>
  );

  const NavButton: React.FC<{ icon: React.ElementType; children?: React.ReactNode; to?: string; onClick?: () => void }> = ({
    icon: Icon,
    children,
    to,
    onClick,
  }) => {
    const ButtonContent = (
      <>
        <Icon className="text-xl" />
        {children && <span className="hidden md:inline ml-1">{children}</span>}
      </>
    );

    return to ? (
      <Link to={to} className="flex items-center hover:text-purple-400 transition-all duration-300">
        {ButtonContent}
      </Link>
    ) : (
      <button onClick={onClick} className="flex items-center hover:text-purple-400 transition-all duration-300">
        {ButtonContent}
      </button>
    );
  };

  const DropdownItem: React.FC<{ to: string; icon: React.ElementType; onClick?: () => void; children: React.ReactNode }> = ({
    to,
    icon: Icon,
    children,
    onClick,
  }) => (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center px-4 py-2 hover:bg-gray-700 transition-all duration-300"
    >
      <Icon className="mr-2 text-purple-400" />
      <span className="text-gray-300">{children}</span>
    </Link>
  );

  return (
    <header className="bg-gray-900 text-white py-3 px-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            QUICKFIX
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" icon={FaHome}>Home</NavLink>
          <NavLink to="/services" icon={FaCogs}>Services</NavLink>
          <NavLink to="/blog" icon={FaBlog}>Blog</NavLink>
        </nav>

        <div className="flex items-center space-x-3">
          <NavButton icon={FaComments} to="/chatInterface" />
          {userData ? (
            <NavButton icon={FaUser} to="/profiler" />
          ) : (
            <NavButton icon={FaUser} to="/login" />
          )}
          <div className="relative">
            <NavButton icon={FaCog} onClick={toggleDropdown} />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                <div className="divide-y divide-gray-700">
                  <DropdownItem to="/mechanic/profile" icon={FiUser}>
                    {userData ? "Profile" : "Sing Up"}
                  </DropdownItem>
                  <DropdownItem to="/mechanic/feedback" icon={FiMessageCircle}>
                    Feedback
                  </DropdownItem>
                  <DropdownItem to={userData ? "/" : "/login"} icon={FiLogOut} onClick={userData ? handleLogout : undefined}>
                    {userData ? "Logout" : "Login"}
                  </DropdownItem>
                </div>
              </div>
            )}
          </div>
          <button
            className="md:hidden text-xl hover:text-purple-400 transition-all duration-300 ml-2"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-gray-800 text-white py-4 px-8 mt-3`}
      >
        <nav className="flex flex-col space-y-4">
          <NavLink to="/" icon={FaHome}>Home</NavLink>
          <NavLink to="/services" icon={FaCogs}>Services</NavLink>
          <NavLink to="/blog" icon={FaBlog}>Blog</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

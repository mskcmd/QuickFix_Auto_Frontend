import React, { useState } from "react";
import { UserData } from "../../app/slice/AuthSlice";
import { useAppSelector } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaComments,
  FaUser,
  FaCog,
  FaHome,
  FaCogs,
  FaBlog,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaSignOutAlt,
  FaCommentAlt,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import { IconType } from "react-icons";
import Logo from "../../../public/Service/Logo1.png";
import { logout } from "../../Api/user";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userLogout } from "../../app/slice/AuthSlice";

function Header() {
  const userData: UserData | null = useAppSelector(
    (state) => state.auth.userData
  );

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

    const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout().then(() => {
          console.log("User logged out");
        });
        dispatch(userLogout());
        navigate("/login");
        toast.success("You are logged out!");
      }
    });
  };

  interface NavLinkProps {
    to: string;
    icon: IconType;
    onClick?: () => void;
    children: React.ReactNode;
  }

  const NavLink: React.FC<NavLinkProps> = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className="flex items-center hover:text-purple-400 transition-all duration-300"
    >
      <Icon className="mr-1" />
      <span>{children}</span>
    </Link>
  );

  interface NavButtonProps {
    icon: IconType;
    children?: React.ReactNode;
    to?: string;
    onClick?: () => void;
  }

  const NavButton: React.FC<NavButtonProps> = ({
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
      <Link
        to={to}
        className="flex items-center hover:text-purple-400 transition-all duration-300"
      >
        {ButtonContent}
      </Link>
    ) : (
      <button
        onClick={onClick}
        className="flex items-center hover:text-purple-400 transition-all duration-300"
      >
        {ButtonContent}
      </button>
    );
  };

  const DropdownItem: React.FC<NavLinkProps> = ({
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
      <Icon className="mr-2" />
      <span>{children}</span>
    </Link>
  );

  return (
    <header className="bg-black text-white py-3 px-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <img
            src={Logo}
            alt="Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
          />
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-400">
            QUICKFIX
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" icon={FaHome}>
            Home
          </NavLink>
          <NavLink to="/services" icon={FaCogs}>
            Services
          </NavLink>
          <NavLink to="/blog" icon={FaBlog}>
            Blog
          </NavLink>
        </nav>

        <div className="flex items-center space-x-3">
          <NavButton icon={FaComments} />
          {userData ? (
            <NavLink to="/profiler" icon={FaUser}>
              {" "}
            </NavLink>
          ) : (
            <NavButton icon={FaSignInAlt} to="/login" />
          )}
          <div className="relative">
            <NavButton icon={FaCog} onClick={toggleDropdown} />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg py-1 z-10">
                {userData ? (
                  <>
                    <DropdownItem
                      to=""
                      icon={FaSignOutAlt}
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownItem>
                    <DropdownItem to="/feedback" icon={FaCommentAlt}>
                      Feedback
                    </DropdownItem>
                    <DropdownItem to="/report" icon={FaExclamationTriangle}>
                      Report
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem to="" icon={FaSignInAlt}>
                      Login
                    </DropdownItem>
                    <DropdownItem to="/about" icon={FaInfoCircle}>
                      About
                    </DropdownItem>
                    <DropdownItem to="/blog" icon={FaBlog}>
                      Blog
                    </DropdownItem>
                  </>
                )}
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
          <NavLink to="/" icon={FaHome}>
            Home
          </NavLink>
          <NavLink to="/services" icon={FaCogs}>
            Services
          </NavLink>
          <NavLink to="/blog" icon={FaBlog}>
            Blog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;

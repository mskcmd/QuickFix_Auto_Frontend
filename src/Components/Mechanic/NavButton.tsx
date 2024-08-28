// NavButton.tsx
import React, { ReactElement } from "react";

interface NavButtonProps {
  icon: ReactElement;
  count: number;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, count }) => (
  <button className="relative p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full transition-colors duration-300">
    {icon}
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {count}
    </span>
  </button>
);

export default NavButton;
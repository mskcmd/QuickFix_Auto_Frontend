import React from "react";

interface Service1 {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  imageUrl: string;
  price: number;
  mechanicName: string;
}

const ServiceItem: React.FC<Service1 & { onClick: () => void }> = ({
  title,
  mechanicName,
  description,
  imageUrl,
  onClick,
}) => (
  <div
    className="mb-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="flex-shrink-0 mr-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-16 h-16 object-cover rounded-full"
        />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <h2 className="font-bold text-gray-800 mb-4">
          Service name: <span className="text-indigo-600">{mechanicName}</span>
        </h2>
      </div>
    </div>
  </div>
);

export default ServiceItem;

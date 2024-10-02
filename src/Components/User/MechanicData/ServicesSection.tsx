import React from "react";
import { FaWrench } from "react-icons/fa";

interface ServiceItemProps {
  service: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service }) => (
  <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
    <FaWrench className="text-blue-600 text-3xl mr-4" />
    <span className="text-lg font-medium">{service}</span>
  </div>
);

interface ServicesSectionProps {
  services: string[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => (
  <div>
    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Services</h3>
    <div className="grid grid-cols-2 gap-4">
      {services.map((service, index) => (
        <ServiceItem key={index} service={service} />
      ))}
    </div>
  </div>
);

export default ServicesSection;
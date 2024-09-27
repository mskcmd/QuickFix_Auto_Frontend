// File: BookingForm.tsx
import React, { useState } from "react";
import { FaUserAlt, FaPhoneAlt, FaMapPin, FaCalendarAlt, FaPlus, FaTimes, FaWrench, FaLocationArrow } from "react-icons/fa";
import { BookingFormData } from "../../../Pages/user/MechBooking";

interface BookingFormProps {
  formData: BookingFormData;
  setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
  mechanic: any;
  onSubmit: (e: React.FormEvent) => void;
  openMapModal: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ formData, setFormData, mechanic, onSubmit, openMapModal }) => {
  const [selectedService, setSelectedService] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addService = () => {
    if (selectedService && !formData.services.includes(selectedService)) {
      setFormData(prevData => ({
        ...prevData,
        services: [...prevData.services, selectedService],
      }));
      setSelectedService("");
    }
  };

  const removeService = (service: string) => {
    setFormData(prevData => ({
      ...prevData,
      services: prevData.services.filter(s => s !== service),
    }));
  };

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <InputField
        icon={<FaUserAlt />}
        name="firstName"
        placeholder="John Doe"
        value={formData.firstName}
        onChange={handleChange}
        label="Full Name"
      />
      <InputField
        icon={<FaPhoneAlt />}
        name="phoneNumber"
        placeholder="+1 (555) 123-4567"
        value={formData.phoneNumber}
        onChange={handleChange}
        label="Phone Number"
      />
      <LocationInput
        location={formData.location}
        openMapModal={openMapModal}
      />
      <ServiceSelection
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        addService={addService}
        removeService={removeService}
        services={formData.services}
        mechanicServices={mechanic?.services || []}
      />
      <InputField
        icon={<FaCalendarAlt />}
        name="dateTime"
        type="datetime-local"
        value={formData.dateTime}
        onChange={handleChange}
        label="Date and Time"
      />
      <TextAreaField
        icon={<FaWrench />}
        name="problem"
        placeholder="Describe your vehicle's issue..."
        value={formData.problem}
        onChange={handleChange}
        label="Problem Description"
      />
      <button
        type="submit"
        className="w-full py-3 px-6 font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
      >
        Confirm Booking
      </button>
    </form>
  );
};

const InputField: React.FC<{
  icon: React.ReactNode;
  name: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}> = ({ icon, name, placeholder, type = "text", value, onChange, label }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
      />
    </div>
  </div>
);

const TextAreaField: React.FC<{
  icon: React.ReactNode;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
}> = ({ icon, name, placeholder, value, onChange, label }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute top-3 left-3 text-gray-400">
        {icon}
      </div>
      <textarea
        id={name}
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  </div>
);

const LocationInput: React.FC<{
  location: string;
  openMapModal: () => void;
}> = ({ location, openMapModal }) => (
  <div>
    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
      Location
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaMapPin className="text-gray-400" />
      </div>
      <input
        type="text"
        id="location"
        name="location"
        value={location}
        readOnly
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
        placeholder="Select your location"
      />
      <button
        type="button"
        onClick={openMapModal}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <FaLocationArrow className="text-gray-400 hover:text-gray-600" />
      </button>
    </div>
  </div>
);

const ServiceSelection: React.FC<{
  selectedService: string;
  setSelectedService: (service: string) => void;
  addService: () => void;
  removeService: (service: string) => void;
  services: string[];
  mechanicServices: string[];
}> = ({ selectedService, setSelectedService, addService, removeService, services, mechanicServices }) => (
  <div>
    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
      Services
    </label>
    <div className="flex">
      <select
        id="service"
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-l-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
      >
        <option value="">Select a service</option>
        {mechanicServices.map((service, index) => (
          <option key={index} value={service}>
            {service}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={addService}
        className="px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <FaPlus />
      </button>
    </div>
    <div className="mt-2 w-full flex flex-wrap gap-2">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-100 p-2 rounded"
        >
          <span className="text-sm text-gray-700">{service}</span>
          <button
            type="button"
            onClick={() => removeService(service)}
            className="ml-2 text-red-600 hover:text-red-800"
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default BookingForm;

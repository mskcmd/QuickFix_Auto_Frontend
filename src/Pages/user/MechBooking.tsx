import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { MechanicProfile } from "../../Components/Common/Interface";
import Header from "../../Components/User/Header";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaMapPin,
  FaTools,
  FaCalendarAlt,
  FaCar,
  FaTimes,
  FaLocationArrow,
  FaPlus,
  FaWrench,
} from "react-icons/fa";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { booking } from "../../Api/user";
import toast from "react-hot-toast";
Modal.setAppElement("#root");

export interface BookingFormData {
  userId: string;
  mechId: string;
  firstName: string;
  phoneNumber: string;
  location: string;
  services: string[];
  dateTime: string;
  problem: string;
  latitude?: number;
  longitude?: number;
}

interface InputFieldProps {
  icon: React.ReactNode;
  name: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) => (
  <div className="relative">
    <div className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
    />
  </div>
);

function MechBooking() {  
  const { id } = useParams<{ id: string }>();
  const userSearchData = useAppSelector(
    (state) => state.auth.userSerchData
  ) as unknown as MechanicProfile[];
  const mechanic = userSearchData.find((m) => m._id === id);
  const userId = useAppSelector((state) => state.auth.userData?.userId);

  const [formData, setFormData] = useState<BookingFormData>({
    userId: userId || "",
    mechId: mechanic?.mechanicID || "",
    firstName: "",
    phoneNumber: "",
    location: "",
    services: [],
    dateTime: "",
    problem: "",
    latitude: undefined,
    longitude: undefined,
  });

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    20.5937, 78.9629,
  ]);
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };

  const addService = () => {
    if (selectedService && !formData.services.includes(selectedService)) {
      setFormData((prevData) => ({
        ...prevData,
        services: [...prevData.services, selectedService],
      }));
      setSelectedService("");
    }
  };

  const removeService = (service: string) => {
    setFormData((prevData) => ({
      ...prevData,
      services: prevData.services.filter((s) => s !== service),
    }));
  };

  const searchLocation = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setSelectedLocation([parseFloat(lat), parseFloat(lon)]);
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setFormData((prevData) => ({
          ...prevData,
          location: display_name,
        }));
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const handleLocationSelect = useCallback(async (lat: number, lng: number) => {
    setSelectedLocation([lat, lng]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const locationName = data.display_name || "Unknown location";

      setFormData((prevData) => ({
        ...prevData,
        location: locationName,
        latitude: lat,
        longitude: lng,
      }));
    } catch (error) {
      console.error("Error fetching location name:", error);
      setFormData((prevData) => ({
        ...prevData,
        location: "Unknown location",
      }));
    }

    closeMapModal();
  }, []);

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          await handleLocationSelect(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };

  const LocationMarker: React.FC = () => {
    const map = useMapEvents({
      click(e) {
        handleLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });

    useEffect(() => {
      map.setView(mapCenter, map.getZoom());
    }, [map, mapCenter]);

    return selectedLocation ? (
      <Marker position={selectedLocation}></Marker>
    ) : null;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking data:", formData);
    try {
      const result = await booking(formData);
      console.log("yuio", result);
      if (result) {
        navigate("/home");
        toast.success("success full booked");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
          {mechanic && (
            <div className="bg-gray-900 text-white p-8 flex items-center space-x-6">
              <img
                src={mechanic.profileImages[0].url}
                alt={mechanic.mechData.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div>
                <h2 className="text-3xl font-bold">{mechanic.mechData.name}</h2>
                <p className="text-gray-300 mt-1">{mechanic.specialization}</p>
                <div className="flex items-center mt-2">
                  <FaTools className="text-yellow-400 mr-2" />
                  <span className="text-sm">
                    {mechanic.yearsOfExperience} Years Experience
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
              Book Your Service
            </h1>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhoneAlt className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                    value={formData.location}
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
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Services
                </label>
                <div className="flex">
                  <select
                    id="service"
                    value={selectedService}
                    onChange={handleServiceChange}
                    className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-l-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  >
                    <option value="">Select a service</option>
                    {mechanic?.services.map((service, index) => (
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

                <div className="mt-2  w-full flex gap-4">
                  {formData.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      <span className="text-sm text-gray-700">{service}</span>
                      <button
                        type="button"
                        onClick={() => removeService(service)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="dateTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date and Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="datetime-local"
                    id="dateTime"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="problem"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Problem Description
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 text-gray-400">
                    <FaWrench />
                  </div>
                  <textarea
                    id="problem"
                    name="problem"
                    rows={4}
                    value={formData.problem}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    placeholder="Describe your vehicle's issue..."
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isMapModalOpen}
        onRequestClose={closeMapModal}
        contentLabel="Select Location"
        className="modal bg-white p-6 rounded-lg shadow-xl max-w-xl mx-auto"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select Location</h2>
          <button
            onClick={closeMapModal}
            className="text-gray-500 hover:text-red-600"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search Location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={searchLocation}
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
          <button
            type="button"
            onClick={getCurrentLocation}
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
          >
            <FaLocationArrow />
          </button>
        </div>
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </Modal>
    </>
  );
}

export default MechBooking;

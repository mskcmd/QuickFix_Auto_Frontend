import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaTools, FaStar, FaTimes, FaSearch, FaMapPin, FaClock } from "react-icons/fa";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import * as Yup from "yup";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { RootState, AppDispatch } from "../../app/store";
import { setUserSerchCredential } from "../../app/slice/AuthSlice";
import { searchMechShop } from "../../Api/user";
import Header from "../../Components/User/Header";

// Types
interface MechanicProfile {
  _id: string;
  specialization: string;
  distanceKm: number;
  type: string;
  profileImages: { url: string }[];
  workingHours: Array<{
    days: string[];
    startTime: string;
    endTime: string;
  }>;
}

interface FormData {
  locationName: string;
  latitude: string;
  longitude: string;
  district: string;
  type: string;
}

// MechanicCard component
const MechanicCard: React.FC<{ mechanic: MechanicProfile }> = ({ mechanic }) => {
  const formatDays = (daysArray: string[]) => {
    if (daysArray.length === 0) return "Not specified";
    const days = JSON.parse(daysArray[0]);
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const sortedDays = days.sort((a: string, b: string) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b));
    
    if (sortedDays.length === 7) return "Mon-Sun";
    if (sortedDays.length === 6 && !sortedDays.includes("Sunday")) return "Mon-Sat";
    if (sortedDays.length === 5 && sortedDays.includes("Monday") && sortedDays.includes("Friday")) return "Mon-Fri";
    
    const firstDay = sortedDays[0].slice(0, 3);
    const lastDay = sortedDays[sortedDays.length - 1].slice(0, 3);
    return `${firstDay}-${lastDay}`;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hoursNum = parseInt(hours, 10);
    const ampm = hoursNum >= 12 ? 'PM' : 'AM';
    const formattedHours = hoursNum % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <img
        src={mechanic.profileImages[0]?.url || "https://via.placeholder.com/300x150"}
        alt={`${mechanic.specialization} mechanic`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          {mechanic.specialization}
        </h2>
        <p className="flex items-center text-sm mb-1 text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-red-500" aria-hidden="true" />
          <span>{mechanic.distanceKm.toFixed(2)} km away</span>
        </p>
        <p className="flex items-center text-sm mb-2 text-gray-600">
          <FaTools className="mr-2 text-blue-500" aria-hidden="true" />
          <span>{mechanic.type}</span>
        </p>
        {mechanic.workingHours && mechanic.workingHours.length > 0 && (
          <p className="flex items-center text-sm mb-2 text-gray-600">
            <FaClock className="mr-2 text-green-500" aria-hidden="true" />
            <span>
              {formatDays(mechanic.workingHours[0].days)}: {formatTime(mechanic.workingHours[0].startTime)} - {formatTime(mechanic.workingHours[0].endTime)}
            </span>
          </p>
        )}
        <div className="flex items-center mb-3" aria-label={`Rating: 4 out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`${i < 4 ? "text-yellow-400" : "text-gray-300"} w-4 h-4`}
              aria-hidden="true"
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">(4.0)</span>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/mechanicData/${mechanic._id}`}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 px-3 rounded transition duration-300 text-center"
          >
            View Details
          </Link>
          <Link 
            to={`/booking/${mechanic._id}`}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-3 rounded transition duration-300 text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
};

// BookingForm component
const BookingForm: React.FC = () => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]);
  const [formData, setFormData] = useState<FormData>({
    locationName: "",
    latitude: "",
    longitude: "",
    district: "",
    type: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch<AppDispatch>();

  const searchLocation = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setSelectedLocation([parseFloat(lat), parseFloat(lon)]);
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setFormData((prevData) => ({
          ...prevData,
          locationName: display_name,
          latitude: lat,
          longitude: lon,
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
      const district = data.address?.county || data.address?.city || "Unknown district";

      setFormData((prevData) => ({
        ...prevData,
        latitude: lat.toString(),
        longitude: lng.toString(),
        locationName: locationName,
        district: district,
      }));
    } catch (error) {
      console.error("Error fetching location name:", error);
      setFormData((prevData) => ({
        ...prevData,
        latitude: lat.toString(),
        longitude: lng.toString(),
        locationName: "Unknown location",
        district: "Unknown district",
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
      click(e: { latlng: { lat: number; lng: number } }) {
        handleLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    useEffect(() => {
      map.setView(mapCenter, map.getZoom());
    }, [map]);

    return selectedLocation ? <Marker position={selectedLocation}></Marker> : null;
  };

  const validationSchema = Yup.object().shape({
    locationName: Yup.string().required("Location is required"),
    latitude: Yup.string().required("Latitude is required"),
    longitude: Yup.string().required("Longitude is required"),
    type: Yup.string().required("Service type is required"),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      console.log("Form data is valid", formData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await searchMechShop(formData);
      dispatch(setUserSerchCredential(result));
      console.log(result);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 sticky top-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Find Your Service
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="flex mt-1">
            <input
              type="text"
              placeholder="Select Place"
              id="location"
              name="location"
              value={formData.locationName}
              className="block w-full py-2 px-3 rounded-l-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              readOnly
            />
            <button
              type="button"
              onClick={openMapModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
            >
              <FaMapPin />
            </button>
          </div>
          {errors.locationName && (
            <p className="text-red-600 text-xs mt-1">{errors.locationName}</p>
          )}
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Service Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select...</option>
            <option value="all">All</option>
            <option value="shop">Shop</option>
            <option value="freelancer">Freelancer</option>
            <option value="company">Company</option>
          </select>
          {errors.type && (
            <p className="text-red-600 text-xs mt-1">{errors.type}</p>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-center"
        >
          <FaSearch className="mr-2" />
          Search
        </motion.button>
      </form>

      <Modal
        isOpen={isMapModalOpen}
        onRequestClose={closeMapModal}
        contentLabel="Choose Location"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-y-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Choose Location</h2>
            <button
              onClick={closeMapModal}
              className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="mb-4 space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search for a location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={searchLocation}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Search
              </button>
            </div>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="w-full bg-green-600 text-white p-2 rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Use Current Location
            </button>
          </div>
          <div className="h-64 md:h-96 w-full">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
            </MapContainer>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

// Main MechanicListingPage component
const MechanicListingPage: React.FC = () => {
  const userSearchData = useSelector(
    (state: RootState) => state.auth.userSerchData
  ) as unknown as MechanicProfile[];
  const [filter, setFilter] = useState("All");
console.log("mm",filter,userSearchData);
console.log("ff",userSearchData);

const filteredData = userSearchData.filter(
  (mechanic) => filter === "All" || mechanic.type === filter.toLowerCase()
);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className=" mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full lg:w-8/12">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-center mb-6 space-x-4">
                {["All", "Shop", "Company", "Freelancer"].map((option) => (
                  <motion.button
                    key={option}
                    onClick={() => setFilter(option)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      filter === option
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-pressed={filter === option}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredData.map((mechanic) => (
                  <motion.div
                    key={mechanic._id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MechanicCard mechanic={mechanic} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          <section className="w-full lg:w-4/12">
            <BookingForm />
          </section>
        </div>
      </main>
    </div>
  );
};

Modal.setAppElement("#root");

export default MechanicListingPage;
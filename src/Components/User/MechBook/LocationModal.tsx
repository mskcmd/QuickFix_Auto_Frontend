import React, { useState } from "react";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { FaTimes, FaLocationArrow } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (lat: number, lng: number, locationName: string) => void;
}

// Continuing from LocationModal.tsx

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onLocationSelect }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]);
    const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  
    const handleSearch = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon, display_name } = data[0];
          setSelectedLocation([parseFloat(lat), parseFloat(lon)]);
          setMapCenter([parseFloat(lat), parseFloat(lon)]);
          onLocationSelect(parseFloat(lat), parseFloat(lon), display_name);
        }
      } catch (error) {
        console.error("Error searching location:", error);
      }
    };
  
    const handleMapClick = async (e: { latlng: { lat: number; lng: number } }) => {
      const { lat, lng } = e.latlng;
      setSelectedLocation([lat, lng]);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const locationName = data.display_name || "Unknown location";
        onLocationSelect(lat, lng, locationName);
      } catch (error) {
        console.error("Error fetching location name:", error);
        onLocationSelect(lat, lng, "Unknown location");
      }
    };
  
    const LocationMarker = () => {
      useMapEvents({
        click: handleMapClick,
      });
  
      return selectedLocation ? (
        <Marker position={selectedLocation}></Marker>
      ) : null;
    };
  
    const getCurrentLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setSelectedLocation([latitude, longitude]);
            setMapCenter([latitude, longitude]);
            handleMapClick({ latlng: { lat: latitude, lng: longitude } });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Select Location"
        className="modal bg-white p-6 rounded-lg shadow-xl max-w-xl mx-auto"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select Location</h2>
          <button
            onClick={onClose}
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
            onClick={handleSearch}
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
    );
  };
  
  export default LocationModal;
import React, { useState, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import "leaflet/dist/leaflet.css";

interface MapModalProps {
  isOpen: boolean;
  onLocationSelect: (locationData: { locationName: string; latitude: string; longitude: string; district: string }) => void;
  onClose: () => void;
}

const LocationMapModal: React.FC<MapModalProps> = ({ isOpen, onLocationSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // Center of India
  const [zoom, setZoom] = useState(5); // Default zoom level for India view

  const searchLocation = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setSelectedLocation([parseFloat(lat), parseFloat(lon)]);
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setZoom(13); // Zoom in when a location is selected
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const handleLocationSelect = useCallback(async (lat: number, lng: number) => {
    setSelectedLocation([lat, lng]);
    setMapCenter([lat, lng]);
    setZoom(13); // Zoom in when a location is selected

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const locationName = data.display_name || "Unknown location";
      const district = data.address?.county || data.address?.city || "Unknown district";

      onLocationSelect({
        locationName,
        latitude: lat.toString(),
        longitude: lng.toString(),
        district,
      });
    } catch (error) {
      console.error("Error fetching location name:", error);
      onLocationSelect({
        locationName: "Unknown location",
        latitude: lat.toString(),
        longitude: lng.toString(),
        district: "Unknown district",
      });
    }

    onClose();
  }, [onLocationSelect, onClose]);

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          setZoom(16); // Zoom in to the current location
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

  const MapComponent: React.FC = () => {
    const map = useMap();
    
    useEffect(() => {
      map.setView(mapCenter, zoom);
    }, [map, mapCenter, zoom]);

    useEffect(() => {
      const handleMapClick = (e: L.LeafletMouseEvent) => {
        handleLocationSelect(e.latlng.lat, e.latlng.lng);
      };

      map.on('click', handleMapClick);

      return () => {
        map.off('click', handleMapClick);
      };
    }, [map]);

    return selectedLocation ? <Marker position={selectedLocation}></Marker> : null;
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Choose Location</ModalHeader>
            <ModalBody>
              <div className="mb-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search for a location"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button color="primary" onPress={searchLocation}>
                    Search
                  </Button>
                </div>
                <Button color="success" onPress={getCurrentLocation} className="w-full">
                  Use Current Location
                </Button>
              </div>
              <div style={{ height: "400px", width: "100%", position: "relative" }}>
                <MapContainer center={mapCenter} zoom={zoom} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapComponent />
                </MapContainer>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LocationMapModal;
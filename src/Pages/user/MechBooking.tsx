import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import Header from "../../Components/User/Header";
import { booking, bookingdata } from "../../Api/user";
import toast from "react-hot-toast";
import MechanicHeader from "../../Components/User/MechBook/MechanicHeader";
import BookingForm from "../../Components/User/MechBook/BookingForm";
import MapModal from "../../Components/User/UserCommen/MapModal";

export interface BookingFormData {
  userId: string;
  mechId: string;
  firstName: string;
  phoneNumber: string;
  location: string;
  services: string[];
  dateTime: string;
  problem: string;
  latitude?: string;
  longitude?: string;
  district?: string;
}

function MechBooking() {
  const { id }:any = useParams<{ id: string }>();
  const userId = useAppSelector((state) => state.auth.userData?.userId);
  const [mechanic, setMechanic] = useState<any>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BookingFormData>({
    userId: userId || "",
    mechId: "",
    firstName: "",
    phoneNumber: "",
    location: "",
    services: [],
    dateTime: "",
    problem: "",
  });

  const fetchData = async () => {
    try {
      const result = await bookingdata(id);
      if (result && result.length >= 4) {
        const mechanicData = {
          id: result[0],
          name: result[1],
          experience: result[2],
          specialization: result[3],
          profileImage: result[4],
          services: result[5]
        };
        setMechanic(mechanicData);
        setFormData(prevData => ({ ...prevData, mechId: mechanicData.id }));
      }
    } catch (error) {
      console.error("Error fetching mechanic data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await booking(formData);
      if (result) {
        navigate("/home");
        toast.success("Successfully booked");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  const handleLocationSelect = (locationData: { locationName: string; latitude: string; longitude: string; district: string }) => {
    setFormData(prevData => ({
      ...prevData,
      location: locationData.locationName,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      district: locationData.district,
    }));
    setIsMapModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
          <MechanicHeader mechanic={mechanic} />
          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
              Book Your Service
            </h1>
            <BookingForm
              formData={formData}
              setFormData={setFormData}
              mechanic={mechanic}
              onSubmit={handleSubmit}
              openMapModal={() => setIsMapModalOpen(true)}
            />
          </div>
        </div>
      </div>
      <MapModal
        isOpen={isMapModalOpen}
        onLocationSelect={handleLocationSelect}
        onClose={() => setIsMapModalOpen(false)}
      />
    </>
  );
}

export default MechBooking;

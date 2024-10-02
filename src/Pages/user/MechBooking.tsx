import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import Header from "../../Components/User/Header";
import { booking, bookingdata } from "../../Api/user";
import toast from "react-hot-toast";
import MechanicHeader from "../../Components/User/MechBook/MechanicHeader";
import BookingForm from "../../Components/User/MechBook/BookingForm";
import LocationModal from "../../Components/User/MechBook/LocationModal";


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

function MechBooking() {
  const { id }: any = useParams<{ id: string }>();
  const userSearchData = useAppSelector((state) => state.auth.userSerchData) as unknown as any[];
  const mechanic1 = userSearchData.find((m) => m._id === id);
  const userId = useAppSelector((state) => state.auth.userData?.userId);

  const [formData, setFormData] = useState<BookingFormData>({
    userId: userId || "",
    mechId: mechanic1?.mechanicID || "",
    firstName: "",
    phoneNumber: "",
    location: "",
    services: [],
    dateTime: "",
    problem: "",
  });
  const [mechanic, setMechanic] = useState<any>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await bookingdata(id);
      if (result && result.length >= 4) {
        setMechanic({
          name: result[0],
          experience: result[1],
          specialization: result[2],
          profileImage: result[3],
          services: result[4]
        });
      }
    } catch (error) {
      console.error("Error fetching mechanic data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleLocationSelect = (lat: number, lng: number, locationName: string) => {
    setFormData(prevData => ({
      ...prevData,
      location: locationName,
      latitude: lat,
      longitude: lng,
    }));
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
      <LocationModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onLocationSelect={handleLocationSelect}
      />
    </>
  );
}

export default MechBooking;

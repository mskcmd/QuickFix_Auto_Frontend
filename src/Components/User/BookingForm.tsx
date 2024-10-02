import React, { useState } from "react";
import { Modal, ModalContent, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchMechShop } from "../../Api/user";
import { setUserSerchCredential } from "../../app/slice/AuthSlice";
import MapModal from "./UserCommen/MapModal";

interface FormData {
  locationName: string;
  latitude: string;
  longitude: string;
  district: string;
  type: string;
}

const BookingForm: React.FC = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [formData, setFormData] = useState<FormData>({
    locationName: "",
    latitude: "",
    longitude: "",
    district: "",
    type: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const result = await searchMechShop(formData);
      console.log("Result:", result);
      dispatch(setUserSerchCredential(result));
      navigate('/mechanicData');
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

  const handleLocationSelect = (locationData: Partial<FormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...locationData,
    }));
    onClose();
  };

  return (
    <div className="container mx-auto px-4 pt-10">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto transform -translate-y-24">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Book Your Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                type="text"
                label="Location"
                placeholder="Select Place"
                value={formData.locationName}
                readOnly
                endContent={
                  <Button color="primary" size="sm" onPress={onOpen}>
                    Choose
                  </Button>
                }
              />
              {errors.locationName && <p className="text-red-600 text-sm mt-1">{errors.locationName}</p>}
            </div>
            <div>
              <Select
                label="Service Type"
                placeholder="Select service type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <SelectItem key="all" value="all">All</SelectItem>
                <SelectItem key="shop" value="shop">Shop</SelectItem>
                <SelectItem key="freelancer" value="freelancer">Freelancer</SelectItem>
                <SelectItem key="company" value="company">Company</SelectItem>
              </Select>
              {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
            </div>
          </div>
          <Button
            type="submit"
            color="primary"
            className="mt-6 w-full"
          >
            Book Now
          </Button>
        </form>
      </div>

      <Modal 
        size="3xl" 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <MapModal onLocationSelect={handleLocationSelect} onClose={onClose} />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BookingForm;
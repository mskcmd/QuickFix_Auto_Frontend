import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import * as Yup from "yup";

import {
  Modal,
  ModalContent,
  Button,
  Input,
  Select,
  SelectItem,
  Card,
} from "@nextui-org/react";
import { searchMechShop } from "../../../Api/user";
import { setUserSerchCredential } from "../../../app/slice/AuthSlice";
import { AppDispatch } from "../../../app/store";
import MapModal from "./MapModal";

interface FormData {
  locationName: string;
  latitude: string;
  longitude: string;
  district: string;
  type: string;
}

const BookingForm: React.FC = () => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    locationName: "",
    latitude: "",
    longitude: "",
    district: "",
    type: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch<AppDispatch>();

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

  const handleLocationSelect = (locationData: {
    locationName: string;
    latitude: string;
    longitude: string;
    district: string;
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      ...locationData,
    }));
    setIsMapModalOpen(false);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Find Your Service
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            label="Location"
            placeholder="Select Place"
            value={formData.locationName}
            readOnly
            endContent={
              <Button color="primary" onPress={() => setIsMapModalOpen(true)}>
                Map
              </Button>
            }
          />
          {errors.locationName && (
            <p className="text-red-600 text-xs mt-1">{errors.locationName}</p>
          )}
        </div>
        <div>
          <Select
            label="Service Type"
            placeholder="Select service type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <SelectItem key="all" value="all">
              All
            </SelectItem>
            <SelectItem key="shop" value="shop">
              Shop
            </SelectItem>
            <SelectItem key="freelancer" value="freelancer">
              Freelancer
            </SelectItem>
            <SelectItem key="company" value="company">
              Company
            </SelectItem>
          </Select>
          {errors.type && (
            <p className="text-red-600 text-xs mt-1">{errors.type}</p>
          )}
        </div>
        <Button
          type="submit"
          color="primary"
          className="w-full"
          startContent={<FaSearch />}
        >
          Search
        </Button>
      </form>

      <Modal 
        isOpen={isMapModalOpen} 
        onOpenChange={(open) => setIsMapModalOpen(open)}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <MapModal
              onLocationSelect={handleLocationSelect}
              onClose={onClose}
            />
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default BookingForm;
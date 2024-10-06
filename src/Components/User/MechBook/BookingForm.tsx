import React, { useState } from "react";
import { Input, Textarea, Select, SelectItem, Button, Chip } from "@nextui-org/react";
import { FaUserAlt, FaPhoneAlt, FaMapPin, FaCalendarAlt, FaPlus, FaWrench, FaLocationArrow } from "react-icons/fa";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, dateTime: e.target.value });
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
    <form className="space-y-8 bg-white p-8 rounded-lg" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          startContent={<FaUserAlt className="text-default-400" />}
          name="firstName"
          placeholder="Full Name"
          value={formData.firstName}
          onChange={handleChange}
          label="Full Name"
        />
        <Input
          startContent={<FaPhoneAlt className="text-default-400" />}
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          label="Phone Number"
        />
      </div>
      <Input
        startContent={<FaMapPin className="text-default-400" />}
        endContent={
          <Button isIconOnly color="primary" variant="flat" onClick={openMapModal}>
            <FaLocationArrow />
          </Button>
        }
        name="location"
        placeholder="Select your location"
        value={formData.location}
        readOnly
        label="Location"
      />
      <div>
        <Select
          label="Services"
          placeholder="Select a service"
          selectedKeys={[selectedService]}
          onSelectionChange={(keys) => setSelectedService(Array.from(keys)[0] as string)}
        >
          {mechanic?.services.map((service: string) => (
            <SelectItem key={service} value={service}>
              {service}
            </SelectItem>
          ))}
        </Select>
        <Button onClick={addService} color="primary" className="mt-2">
          <FaPlus /> Add Service
        </Button>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.services.map((service, index) => (
            <Chip
              key={index}
              onClose={() => removeService(service)}
              variant="flat"
              color="primary"
            >
              {service}
            </Chip>
          ))}
        </div>
      </div>
      <Input
        startContent={<FaCalendarAlt className="text-default-400" />}
        type="datetime-local"
        name="dateTime"
        value={formData.dateTime}
        onChange={handleDateChange}
        label="Date and Time"
      />
      <Textarea
        startContent={<FaWrench className="text-default-400 mt-2" />}
        name="problem"
        placeholder="Describe your vehicle's issue..."
        value={formData.problem}
        onChange={handleChange}
        label="Problem Description"
      />
      <Button
        type="submit"
        color="primary"
        size="lg"
        className="w-full"
      >
        Confirm Booking
      </Button>
    </form>
  );
};

export default BookingForm;
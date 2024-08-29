import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { addService } from "../../../../Api/mechanic";
import { useAppSelector } from "../../../../app/store";
import toast from "react-hot-toast";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    price: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const mechanicData = useAppSelector((state) => state.auth.mechanicData);
  const id: any = mechanicData?.mechnicId;

  const handleSubmit = async () => {
    const { name, details, price } = formData;

    if (!name || !details || !price || !imageFile) {
      alert("Please fill out all fields.");
      return;
    }
    console.log("datas", name, details, price, imageFile, id);
    try {
      const result = await addService(name, details, price, imageFile, id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Service added successfully!");
      }
    } catch (error) {
      console.log(error);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Add New Service
        </ModalHeader>
        <ModalBody>
          <Input
            label="Service Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Textarea
            label="Service Details"
            name="details"
            value={formData.details}
            onChange={handleChange}
          />
          <Input
            label="Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <Input
            label="Upload Image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Add Service
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddServiceModal;

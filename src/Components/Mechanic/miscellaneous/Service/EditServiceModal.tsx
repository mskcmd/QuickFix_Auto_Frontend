import React, { useState, useEffect } from "react";
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
import {  Services } from "../../../Type/MType";

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Services | null;
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  service,

  
}) => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (service) {
      setName(service.serviceName);
      setDetails(service.serviceDetails);
      setPrice(service.price.toString());
      setImageFile(null); // Reset image file if needed
    }
  }, [service]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = () => {
    if (service) {
      // Implement your update logic here
      // e.g., send updated data to the backend
      console.log({
        name,
        details,
        price,
        imageFile,
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Edit Service</ModalHeader>
        <ModalBody>
          <Input
            label="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            label="Service Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <Input
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Upload Image"
            type="file"
            accept="image/*"
            // value={imageUrl}
            onChange={handleFileChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditServiceModal;

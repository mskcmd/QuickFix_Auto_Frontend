import React, { useState } from "react";
import {
  Button,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
} from "@nextui-org/react";
import BillingForm from "./miscellaneous/Payment/BillingForm";
import PaymentsTable from "./miscellaneous/Payment/PaymentsTable";
import { Payment } from "../Type/MType";
import { FormikValues } from "formik";



// Sample data
const payments: Payment[] = [
  {
    id: "1",
    name: "John Doe",
    bank: "HDFC Bank",
    upiId: "john@upi",
    status: "completed",
    price: 1000,
  },
  {
    id: "2",
    name: "Jane Smith",
    bank: "ICICI Bank",
    upiId: "jane@upi",
    status: "pending",
    price: 1500,
  },
  {
    id: "3",
    name: "Bob Johnson",
    bank: "SBI",
    upiId: "bob@upi",
    status: "failed",
    price: 800,
  },
];

const sizes = ["5xl"] as const;

// StatusBadge Component
export const StatusBadge: React.FC<{ status: Payment["status"] }> = ({
  status,
}) => {
  const color =
    status === "completed"
      ? "success"
      : status === "pending"
      ? "warning"
      : "danger";
  return <Badge color={color}>{status}</Badge>;
};

const Payments: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState<(typeof sizes)[number]>("5xl");

  const handleOpen = (selectedSize: (typeof sizes)[number]) => {
    setSize(selectedSize);
    onOpen();
  };

  const variants: ("bordered")[] = ["bordered"];

  const handleSubmit = (values: FormikValues) => {
    console.log("haio",values);
    onClose();
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {sizes.map((size) => (
          <Button
            key={size}
            onPress={() => handleOpen(size)}
            color="primary"
            variant="shadow"
          >
            Generate New Bill
          </Button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="justify-center items-center">
          {variants.map((variant) => (
            <Tabs key={variant} variant={variant} aria-label="Tabs variants">
              <Tab key="Payments" title="Payments">
                <PaymentsTable payments={payments} />
              </Tab>
              <Tab key="Bills" title="Bills">
                <div>Bills...</div>
              </Tab>
              <Tab key="Completed" title="Completed">
                <div>Completed...</div>
              </Tab>
              <Tab key="Pending" title="Pending">
                <div>Pending...</div>
              </Tab>
            </Tabs>
          ))}
        </div>
      </div>

      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        classNames={{
          base: "max-h-[90vh]",
          header: "border-b-1",
          footer: "border-t-1",
          body: "py-6",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl font-bold text-indigo-800">
                Generate New Bill
              </ModalHeader>
              <ModalBody>
                <BillingForm onSubmit={handleSubmit} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Payments;


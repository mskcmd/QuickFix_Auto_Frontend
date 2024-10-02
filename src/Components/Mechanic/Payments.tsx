import React, { useEffect, useState } from "react";
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
import { Payment } from "../Type/MType";
import { FormikValues } from "formik";
import { createBill, paymentFetch } from "../../Api/mechanic";
import { useAppSelector } from "../../app/store";
import PaymentsTable from "./miscellaneous/Payment/PaymentsTable";
import PaymentModal from "./miscellaneous/Payment/PaymentModal";

// Sample data
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
  const { isOpen: isBillModalOpen, onOpen: onBillModalOpen, onClose: onBillModalClose } = useDisclosure();
  const { isOpen: isPaymentModalOpen, onOpen: onPaymentModalOpen, onClose: onPaymentModalClose } = useDisclosure();
  const [size, setSize] = useState<(typeof sizes)[number]>("5xl");
  const [data, setData] = useState<any>([]);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const handleOpen = (selectedSize: (typeof sizes)[number]) => {
    setSize(selectedSize);
    onBillModalOpen();
  };

  const variants: ("bordered")[] = ["bordered"];

  const handleSubmit = async (values: FormikValues) => {
    console.log("Form values:", values);
    const result = await createBill(values);
    onBillModalClose();
  };

  const mechanicData: any = useAppSelector((state) => state.auth.mechanicData);
  const id: string = mechanicData?.data?._id || "";

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const result = await paymentFetch(id);
        console.log("paymet",result);
        
        setData(result);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    if (id) {
      fetchPaymentData();
    }
  }, [id]);

  const handleViewClick = (payment: any) => {
    setSelectedPayment(payment);
    onPaymentModalOpen();
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-3 justify-end mb-6">
        {sizes.map((size) => (
          <Button
            key={size}
            onPress={() => handleOpen(size)}
            color="primary"
          >
            Generate New Bill
          </Button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="justify-center items-center">
          {variants.map((variant) => (
            <Tabs key={variant} variant={variant} aria-label="Tabs variants">
              <Tab key="Pending" title="Pending">
                <PaymentsTable
                  payments={data.filter((payment: any) => payment.status === "pending")}
                  onViewClick={handleViewClick}
                />
              </Tab>
              <Tab key="Completed" title="Completed">
                <PaymentsTable
                  payments={data.filter((payment: any) => payment.status === "Completed")}
                  onViewClick={handleViewClick}
                />
              </Tab>
            </Tabs>
          ))}
        </div>
      </div>

      {/* Billing Modal */}
      <Modal
        size={size}
        isOpen={isBillModalOpen}
        onClose={onBillModalClose}
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

      {/* Payment Details Modal */}
      {selectedPayment && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={onPaymentModalClose}
          payment={selectedPayment}
        />
      )}
    </div>
  );
};

export default Payments;

import React, { useEffect, useState } from "react";
import { Tabs, Tab, useDisclosure } from "@nextui-org/react";
import { useAppSelector } from "../../../app/store";
import { fetchPymnetData } from "../../../Api/user";
import PaymentTable from "../miscellaneous/PaymentTable";
import PaymentModal from "../miscellaneous/PaymentModal";
import InvoiceModal from "../miscellaneous/InvoiceModal";

const Payments: React.FC = () => {
  const variants: "bordered"[] = ["bordered"];
  const [data, setData] = useState<any>([]);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [selectedInvoicePayment, setSelectedInvoicePayment] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isInvoiceOpen, 
    onOpen: onInvoiceOpen, 
    onClose: onInvoiceClose 
  } = useDisclosure();

  const userData: any = useAppSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const result = await fetchPymnetData(userData?.data?._id);
        setData(result);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };
    fetchPaymentData();
  }, [userData?.data?._id]);

  const handleViewClick = (payment: any) => {
    setSelectedPayment(payment);
    onOpen();
  };

  const handleInvoiceClick = (payment: any) => {
    setSelectedInvoicePayment(payment);
    onInvoiceOpen();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Payment</h2>
      <div className="">
        {variants.map((variant) => (
          <Tabs key={variant} variant={variant} aria-label="Tabs variants">
            <Tab key="Pending" title="Pendings">
              <PaymentTable 
                payments={data.filter((payment: any) => payment.status === "pending")} 
                onViewClick={handleViewClick}
                onInvoiceClick={handleInvoiceClick}
              />
            </Tab>
            <Tab key="Completed" title="Completed">
              <PaymentTable 
                payments={data.filter((payment: any) => payment.status === "Completed")} 
                onViewClick={handleViewClick}
                onInvoiceClick={handleInvoiceClick}
              />
            </Tab>
          </Tabs>
        ))}
      </div>

      <PaymentModal 
        isOpen={isOpen} 
        onClose={onClose} 
        payment={selectedPayment} 
      />

      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={onInvoiceClose}
        payment={selectedInvoicePayment}
      />
    </div>
  );
};

export default Payments;
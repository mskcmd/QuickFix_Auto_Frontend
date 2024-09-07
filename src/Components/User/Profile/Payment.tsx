import React, { useEffect, useState } from "react";
import { Tabs, Tab, useDisclosure } from "@nextui-org/react";
import { useAppSelector } from "../../../app/store";
import { fetchPymnetData } from "../../../Api/user";
import PaymentTable from "../miscellaneous/PaymentTable";
import PaymentModal from "../miscellaneous/PaymentModal";

const Payments: React.FC = () => {
  const variants: "bordered"[] = ["bordered"];
  const [data, setData] = useState<any>([]);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              />
            </Tab>
            <Tab key="Completed" title="Completed">
              <PaymentTable 
                payments={data.filter((payment: any) => payment.status === "completed")} 
                onViewClick={handleViewClick}
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
    </div>
  );
};

export default Payments;
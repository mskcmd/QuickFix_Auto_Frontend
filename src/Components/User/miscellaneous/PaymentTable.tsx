import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { Eye } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutService } from "../../../Api/payment";
import { FaDownload } from "react-icons/fa";

const stripePromise = loadStripe(
  "pk_test_51PwFKXBBCrEZsEp78GSAbsmHwIELrCPR7TdBjegsksEafGy5JThFba9DLSVQUFhpmCiHQGhG0c8rJ5yOA4TqdZ2b00AM6XnuOe"
);

interface PaymentTableProps {
  payments: any[];
  onViewClick: (payment: any) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  onViewClick,
}) => {
  const handleCheckout = async (payment: any) => {
    const stripe = await stripePromise;

    const checkoutData = {
      mechanicName: payment.mechanic?.name,
      userName: payment.name,
      totalAmount: payment.total,
      successUrl: `http://localhost:5173/profiler/SuccessPage?paymentId=${payment._id}`,
      cancelUrl: "http://localhost:5173/profiler/CancelPage",
    };

    console.log("Checkout Data:", checkoutData);

    try {
      const response = await checkoutService(checkoutData);
      console.log("Checkout response:", response);

      if (response.data && response.data.sessionId) {
        const result = await stripe?.redirectToCheckout({
          sessionId: response.data.sessionId,
        });

        if (result?.error) {
          console.error("Stripe checkout error:", result.error.message);
        }
      } else {
        console.error("Invalid response from checkout service:", response);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <Table aria-label="Payments table">
      <TableHeader>
        <TableColumn>Service Id</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Total</TableColumn>
        <TableColumn>Actions</TableColumn>
        <TableColumn>View</TableColumn>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment._id}>
            <TableCell>{payment.mechanic.name}</TableCell>
            <TableCell>{payment.name}</TableCell>
            <TableCell
              style={{
                display: "flex",
              }}
            >
              <span
                style={{
                  backgroundColor:
                    payment.status === "pending"
                      ? "orange"
                      : payment.status === "Completed"
                      ? "green"
                      : "gray",
                  color: "white",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "20px",
                  fontSize: "12px",
                  textTransform: "capitalize", 
                }}
              >
                {payment.status}
              </span>
            </TableCell>
            <TableCell>₹{payment.total}</TableCell>
            <TableCell>
              {payment.status === "pending" ? (
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => handleCheckout(payment)}
                >
                  Pay
                </Button>
              ) : (
                <Button
                  size="sm"
                  color="success"
                  onClick={() => {}}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FaDownload />
                </Button>
              )}
            </TableCell>
            <TableCell>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={() => onViewClick(payment)}
              >
                <Eye />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PaymentTable;

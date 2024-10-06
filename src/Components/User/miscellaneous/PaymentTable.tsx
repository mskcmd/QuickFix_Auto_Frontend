import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { Eye, Download } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutService } from "../../../Api/payment";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


interface PaymentTableProps {
  payments: any[];
  onViewClick: (payment: any) => void;
  onInvoiceClick: (payment: any) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  onViewClick,
  onInvoiceClick,
}) => {
  const handleCheckout = async (payment: any) => {
    const stripe = await stripePromise;
    const localUrl = import.meta.env.VITE_LOCAL_URL;

    const checkoutData = {
      mechanicName: payment.mechanic?.name,
      userName: payment.name,
      totalAmount: payment.total,
      successUrl : `${localUrl}/profiler/SuccessPage?paymentId=${payment._id}`,
      cancelUrl : `${localUrl}/profiler/CancelPage`,
    };

    try {
      const response: any = await checkoutService(checkoutData);
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
            <TableCell>
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
                  onClick={() => onInvoiceClick(payment)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Download size={16} />
                  Invoice
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

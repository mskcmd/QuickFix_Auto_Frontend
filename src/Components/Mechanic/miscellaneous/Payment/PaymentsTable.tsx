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
import { Eye } from "lucide-react";
import { Payment } from "../../../Type/MType";

interface PaymentTableProps {
  payments: Payment[];
  onViewClick: (payment: Payment) => void; // Changed type to 'payment'
}

const PaymentsTable: React.FC<PaymentTableProps> = ({ payments, onViewClick }) => {
  return (
    <Table aria-label="Payments table" className="w-full">
      <TableHeader>
      <TableColumn>Service Id</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Total</TableColumn>
        <TableColumn>View</TableColumn>
      </TableHeader>
      <TableBody>
      {payments.map((payment) => (
          <TableRow key={payment._id}>
            <TableCell>{payment.user.name}</TableCell>
            <TableCell>{payment.name}</TableCell>
            <TableCell>{payment.status}</TableCell>
            <TableCell>₹{payment.total}</TableCell>
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

export default PaymentsTable;

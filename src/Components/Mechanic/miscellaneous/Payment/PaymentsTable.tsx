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
import { Eye} from "lucide-react";
import {StatusBadge } from "../../Payments";
import { Payment } from "../../../Type/MType";



const PaymentsTable: React.FC<{ payments: Payment[] }> = ({ payments }) => (
    <Table aria-label="Payments table" className="w-full">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>BANK</TableColumn>
        <TableColumn>UPI ID</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>PRICE</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.name}</TableCell>
            <TableCell>{payment.bank}</TableCell>
            <TableCell>{payment.upiId}</TableCell>
            <TableCell><StatusBadge  status={payment.status} /></TableCell>
            <TableCell>₹{payment.price.toFixed(2)}</TableCell>
            <TableCell>
              <Button isIconOnly size="sm" variant="light" aria-label="View details">
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  export default PaymentsTable;
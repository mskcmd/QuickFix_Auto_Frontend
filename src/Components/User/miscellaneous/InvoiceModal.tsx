import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Download } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, payment }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    const input = document.getElementById('invoiceContent');
    if (input) {
      try {
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a5'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`invoice_${payment._id}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  if (!payment) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-lg font-bold">Invoice</h2>
            </ModalHeader>
            <ModalBody>
              <div id="invoiceContent" className="p-4 bg-white text-sm">
                <div className="flex justify-between mb-4">
                  <div>
                    <h1 className="text-lg font-bold">AutoFix Services</h1>
                    <p>123 Mechanic Street, Autoville</p>
                    <p>Phone: (123) 456-7890</p>
                  </div>
                  <div className="text-right">
                    <p><strong>Invoice #:</strong> {payment._id}</p>
                    <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p><strong>Customer:</strong> {payment.name}</p>
                  <p><strong>Vehicle Number:</strong> {payment.vehicleNumber}</p>
                </div>
                
                <table className="w-full mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Service</th>
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payment.services.map((service: any, index: number) => (
                      <tr key={index} className="border-b">
                        <td className="py-1">{service.serviceName}</td>
                        <td className="py-1">{service.serviceDetails}</td>
                        <td className="text-right py-1">₹{service.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="text-right mb-4">
                  <p><strong>Subtotal:</strong> ₹{payment.subtotal.toFixed(2)}</p>
                  <p><strong>GST:</strong> ₹{payment.gst.toFixed(2)}</p>
                  <p className="text-lg font-bold"><strong>Total:</strong> ₹{payment.total.toFixed(2)}</p>
                </div>
                
                <div className="mb-4">
                  <p><strong>Payment Status:</strong> {payment.status}</p>
                  <p><strong>Mechanic:</strong> {payment.mechanic.name}</p>
                </div>

                <div className="text-center text-xs">
                  <p>Thank you for your business!</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button 
                color="primary" 
                onClick={handleDownload} 
                startContent={<Download size={16} />}
                isLoading={isDownloading}
              >
                {isDownloading ? 'Downloading...' : 'Download Invoice'}
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InvoiceModal;
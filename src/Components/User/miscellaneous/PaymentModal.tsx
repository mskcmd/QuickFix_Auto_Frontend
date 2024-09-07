import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody } from "@nextui-org/react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, payment }) => (
  <Modal 
    isOpen={isOpen} 
    onClose={onClose} 
    size="5xl"
    classNames={{
      body: "py-6",
      backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      base: "border-[#292f46] bg-white dark:bg-[#19172c] text-[#1f2937]",
      header: "border-b-[1px] border-[#292f46]",
      footer: "border-t-[1px] border-[#292f46]",
    }}
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-blue-600">Payment Details</h2>
          </ModalHeader>
          <ModalBody>
            {payment && (
              <div className="flex flex-col md:flex-row gap-6">
                <Card className="flex-1">
                  <CardBody className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-blue-500">Customer Information</h3>
                      <p><span className="font-medium">Name:</span> {payment.name}</p>
                      <p><span className="font-medium">Vehicle Number:</span> {payment.vehicleNumber}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-blue-500">Payment Summary</h3>
                      <p>
                        <span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {payment.status}
                        </span>
                      </p>
                      <p><span className="font-medium">Subtotal:</span> ₹{payment.subtotal}</p>
                      <p><span className="font-medium">GST:</span> ₹{payment.gst}</p>
                      <p className="text-lg font-bold mt-2"><span className="font-medium">Total:</span> ₹{payment.total}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-blue-500">Mechanic Details</h3>
                      <p><span className="font-medium">Name:</span> {payment.mechanic.name}</p>
                      <p><span className="font-medium">Email:</span> {payment.mechanic.email}</p>
                      <p><span className="font-medium">Phone:</span> {payment.mechanic.phone}</p>
                    </div>
                  </CardBody>
                </Card>

                <Card className="flex-1">
                  <CardBody>
                    <h3 className="text-lg font-semibold mb-4 text-blue-500">Services</h3>
                    <div className="space-y-4">
                      {payment.services.map((service: any, index: number) => (
                        <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-lg">{service.serviceName}</p>
                            <p className="font-bold text-lg">₹{service.price}</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{service.serviceDetails}</p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

export default PaymentModal;
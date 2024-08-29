import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";
import { Service, Services } from "../../../Type/MType";

interface ServiceCardProps {
  service: Services;
  onEdit: () => void;
  onDelete: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onEdit,
  onDelete,
}) => {

  
  return (
    <>
      <Card style={{width:"300px",height:"250px"}}>
        <CardHeader>
          <h4>{service.serviceName}</h4>
        </CardHeader>
        <CardBody>
          <Image src={service.imageUrl} alt={service.serviceName} height={60} />
          <p>{service.serviceDetails}</p>
          <p>${service.price}</p>
        </CardBody>
        <CardFooter className="flex justify-between">
          <Button size="sm" color="primary" onClick={onEdit}>
            Edit
          </Button>
          <Button size="sm" color="danger" onClick={onDelete}>
            Delete
          </Button>
        </CardFooter>
      </Card>
      
    </>
  );
};

export default ServiceCard;

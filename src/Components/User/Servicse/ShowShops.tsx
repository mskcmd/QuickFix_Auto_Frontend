import React from "react";
import { Card, CardBody, Button, Chip } from "@nextui-org/react";
import {  MapPin, Clock, User, Eye, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface Shop {
  id: string;
  mechanicID: string;
  name: string;
  locationName: string;
  rating: number;
  services: string[];
  workingHours: { startTime: string; endTime: string }[];
  specialization: string;
  yearsOfExperience: number;
}

interface ShowShopsProps {
  shops: any[];
}

const ShopCard: React.FC<Shop> = ({
  id,
  name,
  locationName,
  services,
  workingHours,
  specialization,
  yearsOfExperience,
}) => (
  <Card className="w-full">
    <CardBody>
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-large font-bold">{name}</h4>
      
      </div>
      <div className="space-y-2 text-small text-default-500">
        <p className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{locationName}</span>
        </p>
        <p className="flex items-center">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          {workingHours[0].startTime} - {workingHours[0].endTime}
        </p>
        <p className="flex items-center">
          {/* <Tools className="w-4 h-4 mr-2 flex-shrink-0" /> */}
          {specialization}
        </p>
        <p className="flex items-center">
          <User className="w-4 h-4 mr-2 flex-shrink-0" />
          {yearsOfExperience} years of experience
        </p>
      </div>
      <div className="mt-3">
        <p className="text-small font-semibold mb-1">Services:</p>
        <div className="flex flex-wrap gap-1">
          {services.slice(0, 3).map((service, index) => (
            <Chip key={index} size="sm" variant="flat">
              {service}
            </Chip>
          ))}
          {services.length > 3 && (
            <Chip size="sm" variant="flat">
              +{services.length - 3} more
            </Chip>
          )}
        </div>

        <div className="flex justify-between mt-2">
          <Button
            size="sm"
            variant="flat"
            color="primary"
            startContent={<Eye size={16} />}
          >
            View Profile
          </Button>
          <Link to={`/booking/${id}`}>
            <Button
              size="sm"
              color="success"
              startContent={<Calendar size={16} />}
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </CardBody>
  </Card>
);

const ShowShops: React.FC<ShowShopsProps> = ({ shops }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Available Shops</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shops.map((shop) => (
        <ShopCard key={shop.mechanicID} {...shop} />
      ))}
    </div>
  </div>
);

export default ShowShops;

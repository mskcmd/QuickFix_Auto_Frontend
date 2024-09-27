import React from 'react';
import { Card, CardBody, Avatar, Chip, Button } from "@nextui-org/react";
import { Star, Clock, Eye, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Freelancer {
  _id: string;
  mechanicID: string;
  name: string;
  specialization: string;
  yearsOfExperience: number;
  profileImages: { url: string }[];
  workingHours: { startTime: string; endTime: string }[];
}

interface TopFreelancersProps {
  freelancers: any[];
}

const FreelancerCard: React.FC<Freelancer> = ({ _id,name, specialization, yearsOfExperience, profileImages, workingHours }) => (
  <Card className="w-full">
    <CardBody className="flex flex-col p-4">
      <div className="flex items-center mb-4">
        <Avatar
          src={profileImages[0]?.url || "/api/placeholder/40/40"}
          size="lg"
          className="mr-4"
        />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{specialization}</h3>
          {/* <p className="text-sm text-gray-600">{specialization}</p> */}
        </div>
      </div>
      <div className="flex items-center mb-4">
        <Chip size="sm" color="primary" variant="flat" className="mr-2">
          {yearsOfExperience} years exp.
        </Chip>
        <p className="text-xs text-gray-500 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {workingHours[0]?.startTime} - {workingHours[0]?.endTime}
        </p>
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
        <Link to={`/booking/${_id}`}>
        <Button 
          size="sm" 
          color="success"
          startContent={<Calendar size={16} />}
        >
          Book Now
        </Button>
        </Link>
      </div>
    </CardBody>
  </Card>
);

const TopFreelancers: React.FC<TopFreelancersProps> = ({ freelancers }) => (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">Top Freelancers</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {freelancers.map(freelancer => (
        <FreelancerCard key={freelancer._id} {...freelancer} />
      ))}
    </div>
  </div>
);

export default TopFreelancers;
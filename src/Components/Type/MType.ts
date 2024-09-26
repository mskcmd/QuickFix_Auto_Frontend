import { Key, ReactNode } from "react";

export interface User {
    _id: string;
    user: any;
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    bookingTime: string;
    coordinates: [number, number];
    locationName: string;
    serviceDetails: string;
    complainDescription: string;
    bookingCount?: number;
  }

  export interface Service {
    id: number;
    name: string;
    details: string;
    price: number;
    imageUrl: string;
  }

  export interface Services {
    id: number;
    _id: string;               // Unique identifier for the service
    mechanic: string;          // Mechanic ID associated with the service
    serviceName: string;       // Name of the service
    serviceDetails: string;    // Detailed description of the service
    price: number;             // Price of the service
    imageUrl: string;          // URL of the service image
    createdAt: string;         // Date and time when the service was created (ISO 8601 format)
    updatedAt: string;         // Date and time when the service was last updated (ISO 8601 format)
    __v: number;               // Version key (used by Mongoose)
  }
  
  export interface MyChatProps {
    fetchAgain?: any;
    setFetchAgain?:any
  }

  export interface Payment {
    _id: Key | null | undefined;
    total: ReactNode;
    user: any;
    id: string;
    name: any;
    bank: string;
    upiId: string;
    status: "pending" | "completed" | "failed";
    price: number;
  }
  
  // types.ts

export interface Service1 {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Shop {
  id: string;
  name: string;
  location: string;
  rating: number;
  services: string[]; // Array of service IDs that the shop offers
}

export interface Freelancer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
}

  
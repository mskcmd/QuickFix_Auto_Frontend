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
  
  
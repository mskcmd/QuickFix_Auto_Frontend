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
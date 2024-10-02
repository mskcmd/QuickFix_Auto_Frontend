export interface MechanicProfile {
    mechanicID: any;
    _id: string;
    name: string;
    specialization: string;
    locationName: string;
    drivingTime: number;
    yearsOfExperience: number;
    services: string[];
    profileImages: { url: string; contentType: string }[];
    description: string;
    workingHours: {
      days: string;
      startTime: string;
      endTime: string;
    }[];
    phoneNumber?: string;
    email?: string;
  }
  
  export interface Review {
    _id: number;
    date: string | number | Date;
    userDetails: any;
    id: number;
    name: string;
    rating: number;
    feedback: string;
  }
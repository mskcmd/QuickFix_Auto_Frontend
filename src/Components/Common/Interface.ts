export interface MechanicProfile {
    mechData: any;
    workingHours: any;
    name: string | undefined;
    bikingTime: number;
    certificate: {
      url: string;
      contentType: string;
    };
    description: string;
    distance: number;
    distanceKm: number;
    district: string;
    drivingTime: number;
    licenseNumber: string;
    location: {
      type: 'Point';
      coordinates: [number, number];
    };
    locationName: string;
    mechanicID: string;
    profileImages: Array<{
      url: string;
      contentType: string;
      _id: string;
    }>;
    services: string[];
    specialization: string;
    type: string;
    walkingTime: number;
    yearsOfExperience: number;
    _id: string;
  }
  
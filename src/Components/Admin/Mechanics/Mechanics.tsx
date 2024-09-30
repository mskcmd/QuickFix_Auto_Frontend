
export interface Certificate {
  url: string;
  contentType: string;
}

export interface ProfileImage {
  url: string;
  contentType: string;
  _id: string;
}

export interface MechanicData {
  certificate: Certificate;
  createdAt: string;
  description: string;
  licenseNumber: string;
  location: string;
  locationName: string;
  mechanicID: string;
  profileImages: ProfileImage[];
  services: string[];
  specialization: string;
  type: string;
  updatedAt: string;
  yearsOfExperience: number;
  _id: string;
}

export interface UserData {
  email: string;
  isBlocked: boolean;
  isCompleted: boolean;
  isMechanic: boolean;
  isSubscriber: boolean;
  isVerified: boolean;
  mechanicdataID: MechanicData;
  name: string;
  phone: string;
  _id: string;
}

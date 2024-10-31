import { MechanicFormData } from "../../../Pages/mechanic/RegisterOne";

export interface ValidationErrors {
  type?: string;
  licenseNumber?: string;
  yearsOfExperience?: string;
  specialization?: string;
  location?: string;
  services?: string;
  description?: string;
  profileImages?: string;
  certificate?: string;
  workingHours?: string;
}

export const validateMechanicForm = (formData: MechanicFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Type validation
  if (!formData.type) {
    errors.type = "Please select your type";
  }

  // License number validation
  if (
    !formData.licenseNumber ||
    !/^\d+$/.test(formData.licenseNumber) ||
    formData.licenseNumber.length < 10
  ) {
    errors.licenseNumber =
      "License number must be a positive number with at least 10 digits";
  }

  // Years of experience validation
  if (!formData.yearsOfExperience || !/^\d+$/.test(formData.yearsOfExperience)) {
    errors.yearsOfExperience = "Years of experience must be a positive number";
  }

  // Specialization validation
  if (!formData.specialization) {
    errors.specialization = "Specialization is required";
  }

  // Location validation
  if (!formData.locationName) {
    errors.location = "Location is required";
  }

  // Services validation
  if (formData.services.length === 0 || formData.services.length < 10) {
    errors.services = "At least 10 services are required";
  }

  // Description validation
  if (!formData.description) {
    errors.description = "Description is required";
  }

  // Profile images validation
  if (formData.profileImages.length === 0 || formData.profileImages.length < 4) {
    errors.profileImages = "At least 4 profile images are required";
  }

  // Certificate validation
  if (
    !formData.certificate ||
    !formData.certificate.name.toLowerCase().endsWith(".pdf")
  ) {
    errors.certificate = "Certificate file is required in PDF format";
  }

  // Working hours validation
  if (formData.workingHours.length === 0) {
    errors.workingHours = "At least one set of working hours is required";
  }

  return errors;
};

// Helper function to check if form is valid
export const isFormValid = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length === 0;
};
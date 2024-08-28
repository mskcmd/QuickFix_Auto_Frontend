interface FormData {
    type: string;
    licenseNumber: string;
    yearsOfExperience: string;
    specialization: string;
    location: string;
    locationName: string;
    services: string[];
    description: string;
    profileImages: File[];
    certificate: File | null;
  }
  
  export const validateForm = (formData: FormData, setErrors: (errors: Record<string, string>) => void) => {
    const newErrors: Record<string, string> = {};
  
    if (!formData.type) newErrors.type = "Please select your type";
    
    if (!formData.licenseNumber || !/^\d+$/.test(formData.licenseNumber) || formData.licenseNumber.length < 10)
      newErrors.licenseNumber = "License number must be a positive number with at least 10 digits";
    
    if (!formData.yearsOfExperience || !/^\d+$/.test(formData.yearsOfExperience))
      newErrors.yearsOfExperience = "Years of experience must be a positive number";
    
    if (!formData.specialization)
      newErrors.specialization = "Specialization is required";
    
    if (!formData.location)
      newErrors.location = "Location is required";
    
    if (formData.services.length === 0 || formData.services.length < 10)
      newErrors.services = "At least 10 services are required";
    
    if (!formData.description)
      newErrors.description = "Description is required";
    
    if (formData.profileImages.length === 0 || formData.profileImages.length < 4)
      newErrors.profileImages = "At least 4 profile images are required";
    
    if (!formData.certificate || !formData.certificate.name.toLowerCase().endsWith(".pdf"))
      newErrors.certificate = "Certificate file is required in PDF format";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
         
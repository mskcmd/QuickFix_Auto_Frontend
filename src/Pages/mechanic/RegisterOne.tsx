import React, { useState, FormEvent } from "react";
import "react-quill/dist/quill.snow.css";
import Modal from "react-modal";
import "leaflet/dist/leaflet.css";
import "./Model.css";
import { mechanicRegister } from "../../Api/mechanic";
import { useAppSelector } from "../../app/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import LocationMapModal from "../../Components/Mechanic/miscellaneous/MapModel/LocationMapModal";
import {
  isFormValid,
  validateMechanicForm,
} from "../../Components/Mechanic/utils/Validation";
import WorkingHoursComponent from "../../Components/Mechanic/miscellaneous/From/WorkingHours";
import DescriptionComponent from "../../Components/Mechanic/miscellaneous/From/Description";
import ImageUploadComponent from "../../Components/Mechanic/miscellaneous/From/ImageUpload";
import CertificateUploadComponent from "../../Components/Mechanic/miscellaneous/From/CertificateUpload";
import ServicesForm from "../../Components/Mechanic/miscellaneous/From/ServicesForm";

Modal.setAppElement("#root");

interface WorkingHours {
  days: string[];
  startTime: string;
  endTime: string;
}

export interface MechanicFormData {
  type: string;
  licenseNumber: string;
  yearsOfExperience: string;
  specialization: string;
  latitude: string;
  longitude: string;
  district: string;
  locationName: string;
  services: string[];
  description: string;
  profileImages: File[];
  certificate: File | null;
  workingHours: WorkingHours[];
}

export interface RegisterOneProps {
  fetchMechanicData: () => Promise<void>;
}

const MechanicRegisterForm: React.FC<RegisterOneProps> = ({
  fetchMechanicData,
}) => {
  const [formData, setFormData] = useState<MechanicFormData>({
    type: "",
    licenseNumber: "",
    yearsOfExperience: "",
    specialization: "",
    latitude: "",
    longitude: "",
    district: "",
    locationName: "",
    services: [],
    description: "",
    profileImages: [],
    certificate: null,
    workingHours: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [serviceInput, setServiceInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "services") {
      setServiceInput(value);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === "profileImages") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: [...prevData.profileImages, ...Array.from(files)],
        }));

        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviews((prev) => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        });
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
      }
    }
  };

  const handleDescriptionChange = (content: string) => {
    setFormData((prevData) => ({ ...prevData, description: content }));
  };

  const removeImage = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImages: prevData.profileImages.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = validateMechanicForm(formData);
    setErrors(newErrors);
    return isFormValid(newErrors);
  };

  const navigate = useNavigate();

  const mechanicData = useAppSelector((state) => state.auth.mechanicData);
  const mechanicId = mechanicData?.mechnicId;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        const result = await mechanicRegister(formData, mechanicId);
        if (result.data) {
          toast.success("Successfully registered!");
          await fetchMechanicData();
          setIsLoading(false);
          navigate("/mechanic/home");
        } else {
          toast.error("Registration failed.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("An error occurred during registration.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Form has errors");
    }
  };

  const handleLocationSelect = (locationData: {
    locationName: string;
    latitude: string;
    longitude: string;
    district: string;
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      locationName: locationData.locationName,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      district: locationData.district,
    }));
    setIsMapModalOpen(false);
  };

  const handleServiceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && serviceInput.trim() !== "") {
      e.preventDefault();
      addService();
    }
  };

  const addService = () => {
    if (serviceInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        services: [...prevData.services, serviceInput.trim()],
      }));
      setServiceInput("");
    }
  };

  const removeService = (indexToRemove: number) => {
    setFormData((prevData) => ({
      ...prevData,
      services: prevData.services.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          Mechanic Registration
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {/* Form fields remain the same */}

          <div className="col-span-1 sm:col-span-1">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Are you
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select...</option>
              <option value="shop">Shop</option>
              <option value="freelancer">Freelancer</option>
              <option value="company">Company</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type}</p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-1">
            <label
              htmlFor="licenseNumber"
              className="block text-sm font-medium text-gray-700"
            >
              License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.licenseNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.licenseNumber}
              </p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-1">
            <label
              htmlFor="yearsOfExperience"
              className="block text-sm font-medium text-gray-700"
            >
              Years of Experience
            </label>
            <input
              type="number"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.yearsOfExperience && (
              <p className="text-red-500 text-xs mt-1">
                {errors.yearsOfExperience}
              </p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-1">
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.specialization && (
              <p className="text-red-500 text-xs mt-1">
                {errors.specialization}
              </p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.locationName}
                  className="mt-1 block w-full py-2 px-3 rounded-l-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Choose
                </button>
              </div>
            </div>
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>

          <ServicesForm
            services={formData.services}
            serviceInput={serviceInput}
            errors={errors}
            handleInputChange={handleInputChange}
            handleServiceKeyDown={handleServiceKeyDown}
            addService={addService}
            removeService={removeService}
          />

          <WorkingHoursComponent
            workingHours={formData.workingHours}
            onWorkingHoursChange={(newWorkingHours) =>
              setFormData((prev) => ({
                ...prev,
                workingHours: newWorkingHours,
              }))
            }
            error={errors.workingHours}
          />

          <div className="sm:col-span-2 md:col-span-3">
            <DescriptionComponent
              value={formData.description}
              onChange={handleDescriptionChange}
              errors={errors.description}
            />
          </div>

          <div className="sm:col-span-2 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <ImageUploadComponent
                images={formData.profileImages}
                imagePreviews={imagePreviews}
                onFileChange={handleFileChange}
                onRemoveImage={removeImage}
                errors={errors.profileImages}
              />
            </div>

            <div className="md:col-span-1">
              <CertificateUploadComponent
                certificate={formData.certificate}
                onFileChange={handleFileChange}
                errors={errors.certificate}
              />
            </div>
          </div>
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 md:col-span-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ClipLoader color="#ffffff" size={14} className="mr-2" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>

      <LocationMapModal
        isOpen={isMapModalOpen}
        onLocationSelect={handleLocationSelect}
        onClose={() => setIsMapModalOpen(false)}
      />
    </div>
  );
};

export default MechanicRegisterForm;

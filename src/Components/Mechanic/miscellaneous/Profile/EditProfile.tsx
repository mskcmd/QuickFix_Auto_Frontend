import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, Avatar, Divider } from "@nextui-org/react";
import { FaCamera, FaUserCircle } from "react-icons/fa";
import { useAppSelector } from "../../../../app/store";
import { getmechData, updateMechanicProfile } from "../../../../Api/mechanic";
import Header from "../../Heder";

export type MechanicDataItem = {
  email: string;
  name: string;
  phone: string;
  image?: string;
  _id: string;
};

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<MechanicDataItem>>({});
  const [errors, setErrors] = useState<Partial<MechanicDataItem>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const mechanicData:any = useAppSelector((state) => state.auth.mechanicData);

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (mechanicData?.mechnicId) {
        try {
          setIsLoading(true);
          const result = await getmechData(mechanicData.mechnicId);
          if (result.length > 0) {
            const { name, email, phone, image } = result[0];
            setFormData({ name, email, phone, image });
            setImagePreview(image);
          }
        } catch (error) {
          console.error("Failed to fetch mechanic data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMechanicData();
  }, [mechanicData]);

  const validateForm = () => {
    const newErrors: Partial<MechanicDataItem> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof MechanicDataItem]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
    //   Add your API call here to update the profile
      await updateMechanicProfile(mechanicData.mechnicId, formData);      
    //   navigate(-1);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Card className="max-w-md mx-auto shadow-xl">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative group">
                <Avatar
                  src={imagePreview}
                  alt="Profile"
                  className="w-32 h-32"
                  fallback={
                    <FaUserCircle className="w-full h-full text-default-500" />
                  }
                />
                <label
                  htmlFor="image"
                  className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <FaCamera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <Divider className="my-2" />

              <div className="w-full space-y-4">
                <Input
                  isRequired
                  label="Full Name"
                  placeholder="Enter your name"
                  value={formData.name || ""}
                  onValueChange={(value) => handleInputChange(value, "name")}
                  errorMessage={errors.name}
                  isInvalid={!!errors.name}
                  variant="bordered"
                  radius="lg"
                  classNames={{
                    input: "text-lg",
                    label: "text-base",
                  }}
                />

                <Input
                  isRequired
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={formData.email || ""}
                  onValueChange={(value) => handleInputChange(value, "email")}
                  errorMessage={errors.email}
                  isInvalid={!!errors.email}
                  variant="bordered"
                  radius="lg"
                  classNames={{
                    input: "text-lg",
                    label: "text-base",
                  }}
                />

                <Input
                  isRequired
                  type="tel"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={formData.phone || ""}
                  onValueChange={(value) => handleInputChange(value, "phone")}
                  errorMessage={errors.phone}
                  isInvalid={!!errors.phone}
                  variant="bordered"
                  radius="lg"
                  classNames={{
                    input: "text-lg",
                    label: "text-base",
                  }}
                />
              </div>

              <div className="flex gap-4 w-full justify-end mt-6">
                <Button
                  variant="flat"
                  color="danger"
                  onClick={() => navigate(-1)}
                  radius="lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  radius="lg"
                  className="px-8"
                  isLoading={isLoading}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;

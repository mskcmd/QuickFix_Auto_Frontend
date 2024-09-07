import React, { useState, useCallback } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import {
  Trash2,
  IndianRupee,
  Truck,
  FileText,
  CreditCard,
  Package,
} from "lucide-react";
import { useAppSelector } from "../../../../app/store";
import toast from "react-hot-toast";
import { searchServices, searchUsers } from "../../../../Api/mechanic";
import debounce from "lodash/debounce";

interface Service {
  _id: any;
  id: string;
  serviceName: string;
  price: number;
}

interface User {
  _id: string;
  name: string;
}

interface BillingFormProps {
  onSubmit: (values: FormData) => void;
}

interface FormData {
  userId: string;
  mechId: string;
  name: string;
  vehicleNumber: string;
  services: any[];
  subtotal: number;
  gst: number;
  total: number;
}


const BillingForm: React.FC<BillingFormProps> = ({ onSubmit }) => {
  const mechanicData: any = useAppSelector((state) => state.auth.mechanicData);
  const id: string = mechanicData?.data?._id || "";
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    name: "",
    vehicleNumber: "",
    services: [],
    subtotal: 0,
    gst: 0,
    total: 0,
    mechId: id,
  });
  const [selectedServices, setSelectedServices] = useState<Service[]>([]); 
  const [userSuggestions, setUserSuggestions] = useState<User[]>([]);
  const [serviceSuggestions, setServiceSuggestions] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log("dsa",userSuggestions);

  const calculateTotal = (services: Service[]) => {
    const subtotal = services.reduce((sum, service) => sum + service.price, 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;
    return { subtotal, gst, total };
  };

  const debouncedSearchUsers = useCallback(
    debounce(async (value: string) => {
      if (value.length > 1) {
        setIsLoading(true);
        try {
          const users = await searchUsers(value, id);
          setUserSuggestions(users);
        } catch (error) {
          console.error("Error searching users:", error);
          toast.error("Failed to fetch user suggestions. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserSuggestions([]);
      }
    }, 300),
    [id]
  );

  const handleUserSearch = (value: string) => {
    setFormData({ ...formData, name: value });
    debouncedSearchUsers(value);
  };

  const debouncedSearchServices = useCallback(
    debounce(async (value: string) => {
      if (value.length > 2) {
        setIsLoading(true);
        try {
          console.log("ahay");
          const services = await searchServices(value, id);
          setServiceSuggestions(services);
        } catch (error) {
          console.error("Error searching services:", error);
          toast.error("Failed to fetch service suggestions. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setServiceSuggestions([]);
      }
    }, 300),
    []
  );

  const handleServiceSearch = (value: string) => {
    debouncedSearchServices(value);
  };

  const handleServiceAdd = (service: Service) => {
    const updatedSelectedServices = [...selectedServices, service]; // Save full service details for display
    const updatedServiceIds = [...formData.services, service._id]; // Save only IDs in formData
    
    const totals = calculateTotal(updatedSelectedServices);
    setSelectedServices(updatedSelectedServices); // Update full service details state
    setFormData({ ...formData, services: updatedServiceIds, ...totals }); // Update formData with only IDs and calculated totals
  };

  const handleServiceRemove = (index: number) => {
    const updatedSelectedServices = selectedServices.filter((_, i) => i !== index);
    const updatedServiceIds = formData.services.filter((_, i) => i !== index);
    
    const totals = calculateTotal(updatedSelectedServices);
    setSelectedServices(updatedSelectedServices);
    setFormData({ ...formData, services: updatedServiceIds, ...totals });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.userId ||
      !formData.name ||
      !formData.vehicleNumber ||
      formData.services.length === 0
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
    onSubmit(formData);
  };

  return (
   <>
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-100 to-purple-100">
        <CardBody className="gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <Autocomplete
                aria-label="Search for users"
                value={formData.name}
                onInputChange={handleUserSearch}
                startContent={
                  <FileText className="text-blue-500 pointer-events-none flex-shrink-0" />
                }
                className="w-full"
                isLoading={isLoading}
              >
                {userSuggestions.map((user) => (
                  <AutocompleteItem
                    key={user._id}
                    value={user._id}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        userId: user?._id,
                        name: user.name,
                      })
                    }
                  >
                    {user.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>

            {/* Vehicle Number Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Vehicle Number
              </label>
              <Input
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                startContent={
                  <Truck className="text-blue-500 pointer-events-none flex-shrink-0" />
                }
                className="w-full"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Services Section */}
      <Card className="bg-gradient-to-r from-blue-100 to-purple-100">
        <CardHeader className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-gray-800 p-4">Services</h4>
          <Autocomplete 
            aria-label="Search for services"
            onInputChange={handleServiceSearch}
            startContent={
              <Package className="text-blue-500  pointer-events-none flex-shrink-0" />
            }
            className="w-full"
          >
            {serviceSuggestions.map((service) => (
              <AutocompleteItem
                key={service.id}
                value={service.id}
                onClick={() => handleServiceAdd(service)}
              >
                {service.serviceName}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </CardHeader>
        <Divider />
        <CardBody className="gap-4">
        {selectedServices.map((service, index) => (
            <div key={index} className="flex items-center space-x-5">
              <Input
                value={service?.serviceName}
                startContent={
                  <Package className="text-blue-500 pointer-events-none flex-shrink-0" />
                }
                readOnly
                className="flex-grow"
              />
              <Input
                value={service.price.toString()}
                startContent={
                  <IndianRupee className="text-blue-500 pointer-events-none flex-shrink-0" />
                }
                readOnly
                className="w-32"
              />
              <Button
                isIconOnly
                color="danger"
                variant="flat"
                onPress={() => handleServiceRemove(index)}
                size="sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Billing Summary */}
      <Card className="bg-gradient-to-r from-yellow-100 to-orange-100">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Subtotal
              </label>
              <Input
                value={formData.subtotal.toFixed(2)}
                startContent={
                  <CreditCard className="text-yellow-500 pointer-events-none flex-shrink-0" />
                }
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                GST (18%)
              </label>
              <Input
                value={formData.gst.toFixed(2)}
                startContent={
                  <CreditCard className="text-yellow-500 pointer-events-none flex-shrink-0" />
                }
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Total</label>
              <Input
                value={formData.total.toFixed(2)}
                startContent={
                  <CreditCard className="text-yellow-500 pointer-events-none flex-shrink-0" />
                }
                readOnly
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Button
        type="submit"
        color="primary"
        size="lg"
        className="w-full"
        variant="solid"
      >
        Submit Billing
      </Button>
    </form>
   </>
  );
};

export default BillingForm;

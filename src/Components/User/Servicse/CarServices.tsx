import React, { useEffect, useLayoutEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ShowShops from "./ShowShops";
import TopFreelancers from "./TopFreelancers";
import { Freelancer, Service1, Shop } from "../../Type/MType";
import {
  fetchFreelancersData,
  fetchServiceData,
  fetchShopData,
} from "../../../Api/user";

const CarServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("popular");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [services, setServices] = useState<Record<string, Service1[]>>({
    popular: [],
    new: [],
  });


  const fetchFreelancers = async () => {
    try {
      const response = await fetchFreelancersData();
      const transformedFreelancers = response.map((freelancer: any) => ({
        _id: freelancer._id,
        mechanicID: freelancer.mechanicID,
        name: freelancer.mechanicDetails?.name || "Unknown",
        specialization: freelancer.specialization,
        yearsOfExperience: freelancer.yearsOfExperience,
        profileImages: freelancer.profileImages,
        workingHours: freelancer.workingHours,
      }));
      setFreelancers(transformedFreelancers);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
    }
  };

  const fetchService = async () => {
    try {
      const response = await fetchServiceData();
      const transformedServices: Record<string, any[]> = {
        popular: [],
        new: [],
      };

      response.popular.forEach((service: any) => {
        transformedServices.popular.push({
          id: service._id,
          title: service.serviceName,
          description: service.serviceDetails,
          icon: getIconForService(service.serviceName),
          imageUrl: service.imageUrl,
          price: service.price,
          mechanicName: service.mechanicName,
        });
      });

      response.new.forEach((service: any) => {
        transformedServices.new.push({
          id: service._id,
          title: service.serviceName,
          description: service.serviceDetails,
          icon: getIconForService(service.serviceName),
          imageUrl: service.imageUrl,
          price: service.price,
          mechanicName: service.mechanicName,
        });
      });

      setServices(transformedServices);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  const handleServiceClick = async (serviceId: string) => {
    try {
      const response = await fetchShopData(serviceId);
      const transformedShops = response.map((shop: any) => ({
        id: shop.mechanicData._id,
        mechanicID: shop.mechanicData.mechanicID,
        name: shop.mechanicDetails.name,
        locationName: shop.mechanicData.locationName,
        rating: parseFloat(shop.mechanicData.rating || "0"),
        services: shop.mechanicData.services,
        workingHours: shop.mechanicData.workingHours,
        specialization: shop.mechanicData.specialization,
      }));
      setFilteredShops(transformedShops);
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
    setSelectedService(serviceId);
  };

  useLayoutEffect(() => {
    fetchService();
    fetchFreelancers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        QUICKFIX
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Sidebar
            services={services}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleServiceClick={handleServiceClick}
          />
        </div>

        <div className="lg:w-2/3">
          <ShowShops shops={filteredShops} />
          <TopFreelancers freelancers={freelancers} />
        </div>
      </div>
    </div>
  );
};

// Helper function to get an icon based on the service name
const getIconForService = (serviceName: string) => {
  // You can implement logic here to return appropriate icons based on the service name
  // For now, we'll return a placeholder function
  return () => <span>🔧</span>;
};

export default CarServices;

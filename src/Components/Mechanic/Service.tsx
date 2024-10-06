// ServicePage.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { Services } from "../Type/MType";
import EditServiceModal from "./miscellaneous/Service/EditServiceModal";
import AddServiceModal from "./miscellaneous/Service/AddServiceModal";
import ServiceCard from "./miscellaneous/Service/ServiceCard";
import { useAppSelector } from "../../app/store";
import { fetchService } from "../../Api/mechanic";

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<Services[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Services | null>(null);
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);
  const id: any = mechanicData?.mechnicId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await fetchService(id);
        setServices(response);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchData();
  }, [id]);



  const handleDelete = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setServices(services.filter((s) => s.id !== id));
        Swal.fire("Deleted!", "Your service has been deleted.", "success");
      }
    });
  };

  return (
    <>
     <div className="min-h-screen">
     <Button
        onClick={() => setIsAddModalOpen(true)}
        color="primary"
        className="my-4"
      >
        Add Service
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            onEdit={() => {
              setEditingService(service);
              setIsEditModalOpen(true);
            }}
            onDelete={() => handleDelete(service._id)}
          />
        ))}
      </div>
      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditServiceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        service={editingService}
      />
     </div>
    </>
  );
};

export default ServicePage;

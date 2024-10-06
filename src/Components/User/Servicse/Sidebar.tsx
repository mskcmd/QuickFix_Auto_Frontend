import React, { useState } from 'react';
import { Tabs, Tab, Input } from "@nextui-org/react";
import { Search, Star, Zap } from "lucide-react";
import ServiceItem from './ServiceItem';


interface SidebarProps {
  services: Record<string, any[]>;
  activeTab: string;
  setActiveTab: (key: string) => void;
  handleServiceClick: (serviceId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ services, activeTab, setActiveTab, handleServiceClick }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredServices = services[activeTab]?.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div>
      <Tabs 
        aria-label="Service options" 
        selectedKey={activeTab} 
        onSelectionChange={(key) => setActiveTab(key as string)}
      >
        <Tab key="popular" title={<div className="flex items-center space-x-2"><Star className="w-4 h-4" /><span>Popular Services</span></div>} />
        <Tab key="new" title={<div className="flex items-center space-x-2"><Zap className="w-4 h-4" /><span>New Services</span></div>} />
      </Tabs>
      <div className="mt-4 mb-6">
        <Input
          placeholder="Search for a service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search className="text-gray-400" />}
        />
      </div>
      <div className="mt-6">
        {filteredServices.map(service => (
          <ServiceItem key={service.id} {...service} onClick={() => handleServiceClick(service.title)} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
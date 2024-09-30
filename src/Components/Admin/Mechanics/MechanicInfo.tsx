import { FaBriefcase, FaCalendarAlt, FaCertificate, FaMapMarkerAlt, FaTools } from "react-icons/fa";
import { InfoItem } from "./InfoItem";

const MechanicInfo: React.FC<{ mechanicData: any }> = ({ mechanicData }) => (
    <div>
      <InfoItem
        icon={FaCertificate}
        label="License Number"
        value={mechanicData?.licenseNumber}
      />
      <InfoItem
        icon={FaMapMarkerAlt}
        label="Location"
        value={mechanicData?.locationName}
      />
      <InfoItem
        icon={FaTools}
        label="Specialization"
        value={mechanicData?.specialization}
      />
      <InfoItem icon={FaBriefcase} label="Type" value={mechanicData?.type} />
      <InfoItem
        icon={FaCalendarAlt}
        label="Years of Experience"
        value={mechanicData?.yearsOfExperience?.toString()}
      />
    </div>
  );

  export {MechanicInfo };

import { FaCheck, FaEnvelope, FaLock, FaPhone, FaTools } from "react-icons/fa";
import { InfoItem } from "./InfoItem";

const UserInfo: React.FC<{ user: any }> = ({ user }) => (
    <div>
      <InfoItem icon={FaEnvelope} label="Email" value={user.email} />
      <InfoItem icon={FaPhone} label="Phone" value={user.phone} />
      <InfoItem
        icon={FaLock}
        label="Blocked"
        value={user.isBlocked ? "Yes" : "No"}
      />
      <InfoItem
        icon={FaCheck}
        label="Completed"
        value={user.isCompleted ? "Yes" : "No"}
      />
      <InfoItem
        icon={FaTools}
        label="Mechanic"
        value={user.isMechanic ? "Yes" : "No"}
      />
      <InfoItem
        icon={FaCheck}
        label="Subscriber"
        value={user.isSubscriber ? "Yes" : "No"}
      />
      <InfoItem
        icon={FaCheck}
        label="Verified"
        value={user.isVerified ? "Yes" : "No"}
      />
    </div>
  );

  export { UserInfo };

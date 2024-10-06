import {
  FaEnvelope,
  FaEye,
  FaLock,
  FaLockOpen,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { SubscriptionStatus } from "./SubscriptionStatus";

const MechanicCard: React.FC<{
  user: any;
  index: number;
  onToggleBlock: (index: number) => void;
  onViewDetails: (user: any) => void;
  onImageClick: (imageUrl: string) => void;
}> = ({ user, onToggleBlock, onViewDetails, onImageClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex items-center mb-4">
        {user.mechanicdataID?.profileImages &&
        user.mechanicdataID.profileImages.length > 0 ? (
          <img
            src={user.mechanicdataID.profileImages[0]?.url}
            alt={user.name}
            className="w-16 h-16 rounded-full mr-4 cursor-pointer hover:opacity-80 transition duration-300"
            onClick={() =>
              onImageClick(user.mechanicdataID.profileImages[0]?.url ?? "")
            }
          />
        ) : (
          <FaUser className="w-16 h-16 text-blue-500 mr-4" />
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 text-nowrap">
            {user.name}
          </h2>
          <p className="text-sm text-gray-600">
            {user.mechanicdataID?.specialization}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <p className="flex items-center text-sm text-gray-600 mb-1">
          <FaEnvelope className="mr-2" />
          {user.email}
        </p>
        <p className="flex items-center text-sm text-gray-600">
          <FaPhone className="mr-2" />
          {user.phone}
        </p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            user.isVerified
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {user.isBlocked ? "Verified" : "Not Verified"}
        </span>
        <SubscriptionStatus
          isSubscriber={user.isSubscriber}
          isCompleted={user.isCompleted}
        />
      </div>
      <button
        onClick={() => onToggleBlock(user?._id)}
        className={`w-full py-2 rounded-full text-sm font-semibold mb-2 transition duration-300 ${
          user.isBlocked
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        {user.isBlocked ? (
          <>
            <FaLockOpen className="inline mr-2" />
            Unblock
          </>
        ) : (
          <>
            <FaLock className="inline mr-2" />
            Block
          </>
        )}
      </button>
      <button
        onClick={() => onViewDetails(user)}
        className="w-full py-2 px-4 rounded-full text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
      >
        <FaEye className="inline mr-2" />
        View Details
      </button>
    </div>
  );
};

export { MechanicCard };

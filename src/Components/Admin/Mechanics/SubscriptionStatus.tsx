import { FaCheck, FaTimes } from "react-icons/fa";

const SubscriptionStatus: React.FC<{
    isSubscriber: boolean;
    isCompleted: boolean;
  }> = ({ isSubscriber, isCompleted }) => {
    if (isSubscriber) {
      return (
        <span className="text-xs font-semibold text-green-600">
          <FaCheck className="inline mr-1" />
          Subscribed
        </span>
      );
    } else if (isCompleted) {
      return (
        <button className="text-xs font-semibold bg-green-200 text-green-700 px-3 py-1 rounded-full hover:bg-green-300 transition duration-300">
          Subscribe
        </button>
      );
    } else {
      return (
        <span className="text-xs font-semibold text-red-600">
          <FaTimes className="inline mr-1" />
          Not Subscribed
        </span>
      );
    }
  };

  export {SubscriptionStatus };



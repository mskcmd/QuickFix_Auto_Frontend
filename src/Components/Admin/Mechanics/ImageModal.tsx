import { FaTimes } from "react-icons/fa";

const ImageModal: React.FC<{
    imageUrl: string;
    onClose: () => void;
  }> = ({ imageUrl, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="relative max-w-4xl w-full">
        <img src={imageUrl} alt="Profile" className="w-full h-auto rounded-lg" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 transition duration-300"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );

  export {ImageModal}
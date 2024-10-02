import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface ImageModalProps {
  image: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
  >
    <div className="relative bg-white p-4 rounded-lg max-w-lg">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        <FaTimes className="text-2xl" />
      </button>
      <img src={image} alt="Selected" className="w-full h-auto" />
    </div>
  </motion.div>
);

export default ImageModal;
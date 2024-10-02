import React from "react";

interface GalleryImageProps {
  image: { url: string; contentType: string };
  onClick: () => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, onClick }) => (
  <div
    className="relative cursor-pointer overflow-hidden rounded-lg"
    onClick={onClick}
  >
    <img
      src={image.url}
      alt="Gallery image"
      className="w-full h-full object-cover"
    />
  </div>
);

interface GallerySectionProps {
  images: { url: string; contentType: string }[];
  onImageClick: (url: string) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({ images, onImageClick }) => (
  <div className="px-8 py-10 bg-gray-100">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Gallery</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <GalleryImage
          key={index}
          image={image}
          onClick={() => onImageClick(image.url)}
        />
      ))}
    </div>
  </div>
);

export default GallerySection;
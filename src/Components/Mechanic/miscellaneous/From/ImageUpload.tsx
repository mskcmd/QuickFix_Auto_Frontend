import React from 'react';

interface ImageUploadProps {
  images: File[];
  imagePreviews: string[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  errors?: string;
}

const ImageUploadComponent: React.FC<ImageUploadProps> = ({
  images,
  imagePreviews,
  onFileChange,
  onRemoveImage,
  errors
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Profile Images
      </label>
      <div className="flex flex-wrap gap-2">
        {images.map((_, index) => (
          <div key={index} className="w-24 h-24 relative">
            <img
              src={imagePreviews[index]}
              alt={`Profile Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
        <label
          htmlFor="profileImages"
          className="flex flex-col items-center justify-center w-24 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-3 pb-2">
            <svg
              className="w-6 h-6 mb-1 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 00 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="text-xs text-gray-500">Add Image</p>
          </div>
          <input
            id="profileImages"
            name="profileImages"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onFileChange}
            multiple
          />
        </label>
      </div>
      {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
    </div>
  );
};

export default ImageUploadComponent;
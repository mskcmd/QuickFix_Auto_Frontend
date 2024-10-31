import React from 'react';

interface BasicInformationProps {
  formData: {
    type: string;
    licenseNumber: string;
    yearsOfExperience: string;
    specialization: string;
    locationName: string;
  };
  errors: Record<string, any>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  openMapModal: () => void;
}

const BasicInformationForm: React.FC<BasicInformationProps> = ({
  formData,
  errors,
  handleInputChange,
  openMapModal
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="col-span-1">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Are you
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select...</option>
          <option value="shop">Shop</option>
          <option value="freelancer">Freelancer</option>
          <option value="company">Company</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-xs mt-1">{errors.type}</p>
        )}
      </div>

      <div className="col-span-1">
        <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
          License Number
        </label>
        <input
          type="text"
          id="licenseNumber"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.licenseNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>
        )}
      </div>

      <div className="col-span-1">
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
          Years of Experience
        </label>
        <input
          type="number"
          id="yearsOfExperience"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.yearsOfExperience && (
          <p className="text-red-500 text-xs mt-1">{errors.yearsOfExperience}</p>
        )}
      </div>

      <div className="col-span-1">
        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
          Specialization
        </label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.specialization && (
          <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>
        )}
      </div>

      <div className="col-span-2">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <div className="flex">
          <input
            type="text"
            id="location"
            name="location"
            value={formData.locationName}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 rounded-l-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            readOnly
          />
          <button
            type="button"
            onClick={openMapModal}
            className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Choose
          </button>
        </div>
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInformationForm;
import React from 'react';

interface ServicesFormProps {
  services: string[];
  serviceInput: string;
  errors: Record<string, any>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleServiceKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addService: () => void;
  removeService: (index: number) => void;
}

const ServicesForm: React.FC<ServicesFormProps> = ({
  services,
  serviceInput,
  errors,
  handleInputChange,
  handleServiceKeyDown,
  addService,
  removeService
}) => {
  return (
    <div className="col-span-1 sm:col-span-2">
      <label htmlFor="services" className="block text-sm font-medium text-gray-700">
        Services
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {services.map((service, index) => (
          <span
            key={index}
            className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded flex items-center"
          >
            {service}
            <button
              type="button"
              onClick={() => removeService(index)}
              className="ml-2 text-indigo-600 hover:text-indigo-800"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          id="services"
          name="services"
          value={serviceInput}
          onChange={handleInputChange}
          onKeyDown={handleServiceKeyDown}
          className="mt-1 block w-full py-2 px-3 rounded-l-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter a service and press Enter"
        />
        <button
          type="button"
          onClick={addService}
          className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>
      {errors.services && (
        <p className="text-red-500 text-xs mt-1">{errors.services}</p>
      )}
    </div>
  );
};

export default ServicesForm;
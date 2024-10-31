import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface DescriptionComponentProps {
  value: string;
  onChange: (content: string) => void;
  errors?: string;
}

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  value,
  onChange,
  errors
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <ReactQuill
        value={value}
        onChange={onChange}
        className="mt-1 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
    </div>
  );
};

export default DescriptionComponent;
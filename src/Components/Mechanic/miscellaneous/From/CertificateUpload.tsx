import React from 'react';

interface CertificateUploadProps {
  certificate: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
}

const CertificateUploadComponent: React.FC<CertificateUploadProps> = ({
  certificate,
  onFileChange,
  errors
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload Certificate
      </label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="certificate"
          className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          {certificate ? (
            <div className="flex flex-col items-center justify-center">
              <svg
                className="w-8 h-8 mb-1 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              <p className="text-xs text-gray-500">{certificate.name}</p>
            </div>
          ) : (
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
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-xs text-gray-500">PDF, DOC, or DOCX</p>
            </div>
          )}
          <input
            id="certificate"
            name="certificate"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={onFileChange}
          />
        </label>
      </div>
      {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
    </div>
  );
};

export default CertificateUploadComponent;
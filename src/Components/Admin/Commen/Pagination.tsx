import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Constants for pagination
  const maxPagesToShow = 8;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust startPage if the endPage is less than maxPagesToShow
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="py-1 px-3 mx-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Show the first page and ellipses if needed */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="py-1 px-3 mx-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="py-1 px-3 mx-1 rounded bg-gray-200 text-gray-600">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          onClick={() => handlePageChange(startPage + index)}
          className={`py-1 px-3 mx-1 rounded ${
            currentPage === startPage + index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {startPage + index}
        </button>
      ))}

      {/* Show the last page and ellipses if needed */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="py-1 px-3 mx-1 rounded bg-gray-200 text-gray-600">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="py-1 px-3 mx-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="py-1 px-3 mx-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import toast from 'react-hot-toast';

interface CustomToastProps {
  message: string;
}

// Custom toast component
const CustomToast: React.FC<CustomToastProps> = ({ message }) => (
  <div style={{ 
    backgroundColor: '#3172F5', 
    color: 'white', 
    padding: '20px', 
    width:"1000px",
    borderRadius: '5px',
    textAlign: 'center'
  }}>
    {message}
  </div>
);

// Track the visibility of the custom toast
let isToastVisible = false;

// Function to show the custom toast
export const showCustomToast = () => {
  if (!isToastVisible) {
    isToastVisible = true;
    const toastId = toast.custom(
      <CustomToast message="Please fill the register." />,
      {
        duration: 3000,
      }
    );
    setTimeout(() => {
      toast.remove(toastId);
      isToastVisible = false;
    }, 3000);
  }
};

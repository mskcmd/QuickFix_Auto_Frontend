import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../Api/user';
import { ResetPasswordValidation } from '../../Components/Common/Validations'; // Corrected import statement
import { toast } from "react-toastify";

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
          const navigate = useNavigate();

  const params = useParams<{ userid: string }>(); // Updated type for params
  const userId = params.userid || ''; // Ensure userId is not undefined
console.log("jk",userId);

  const initialValues: FormValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: FormValues) => {
    // Perform reset password logic here using values.newPassword and values.confirmPassword
    console.log('New Password:', values.newPassword);
    console.log('Confirm Password:', values.confirmPassword);
    const result = await resetPassword(values.newPassword, userId); // Pass userId to the resetPassword function
    console.log("kjsd",result);
    if(result?.status==200){
      toast.success('Successfully changed password.');
      navigate("/login");
    }else{
      console.log("error");
    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={ResetPasswordValidation}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
                New Password
              </label>
              <Field
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <ErrorMessage name="newPassword" component="div" className="text-red-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset Password
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;

import { useFormik } from 'formik';
import { EmailValidation } from '../../Components/Common/Validations';
import {  useNavigate } from 'react-router-dom';
import { forgetPassword } from '../../Api/mechanic';

interface initelVal {
  email: string;
}

const initialValues: initelVal = {
  email: "",
};

const ForgotPassword = () => {
    const navigate = useNavigate();

    
    

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: EmailValidation,
        onSubmit: async (values) => {
          console.log('Email:', values.email);
          try {
           const result =  await forgetPassword(values.email);
           console.log("hhk",result?.data.result.result._id);
           const userId =result?.data.result.result._id
           if(result){
            navigate(`/mechanic/forget/otp-page/${userId}`); 
          }
          } catch (error) {
            console.log(error);
          }
        },
      });
      

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mech Forgot Password</h1>
            <p className="text-gray-600">Enter your email address to reset your password.</p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                id="email"
                type="email"
                placeholder="Enter your email"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm mt-2">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

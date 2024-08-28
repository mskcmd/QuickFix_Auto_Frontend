import React from "react";
import { useFormik } from "formik";
import { LoginValidation } from "../../Components/Common/Validations";
import { Login } from "../../Api/admin";
import { useDispatch } from "react-redux";
import { setAdminCredential } from "../../app/slice/AuthSlice";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface IinitialValues {
  email: string;
  password: string;
}
const IinitialValues: IinitialValues = {
  email: "",
  password: "",
};
const AdminLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: IinitialValues,
    validationSchema: LoginValidation,
    onSubmit: (values) => {
      const handleSubmit = async () => {
        try {
          const data = await Login(values.email, values.password);
          const userData = data?.data.data
          console.log("cccc",userData);
          dispatch(setAdminCredential(userData));
          navigate("/admin/dashboard/dashboard"); 
          toast.success("admin is logined!"); 

        } catch (error) {
          console.log(error);
        }
      };
      handleSubmit();
    },
  });
  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gradient-to-r from-gray-800 to-gray-700">
      <div className="h-[85vh] w-[70vh] col-span-6 hidden md:block relative">
        <img
          src="https://img.freepik.com/free-vector/car-service-logo-design_23-2149750690.jpg?t=st=1717655993~exp=1717659593~hmac=2ef181f4aa878c2cc79d4580f692417493b1c54ec45f3bf30737939e5431b020&w=740"
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover rounded-l-lg"
        />
      </div>
      <div className="flex flex-col justify-center h-[85vh] w-[70vh] bg-white p-8 rounded-r-lg">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Admin-Login
        </h2>
        <div className="mb-6">
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Username or Email"
              className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <small className="text-red-500">{errors.email}</small>
            )}

            <input
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <small className="text-red-500">{errors.password}</small>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-blue-950 transition duration-300"
            >
              Submit
            </button>
            <div className="flex justify-between mt-4">
              <p className="text-sm text-gray-600">
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  Forgot Password?
                </a>
              </p>
          
            </div>
          </form>
          <div className="mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

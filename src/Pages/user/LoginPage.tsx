import React from "react";
import { useFormik } from "formik";
import { LoginValidation } from "../../Components/Common/Validations";
import { Login } from "../../Api/user";
import { useDispatch } from "react-redux";
import { setUserCredential } from "../../app/slice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IinitialValues {
  email: string;
  password: string;
}
const IinitialValues: IinitialValues = {
  email: "",
  password: "",
};
const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: IinitialValues,
    validationSchema: LoginValidation,
    onSubmit: (values) => {
      const handleSubmit = async () => {
        try {
          const data = await Login(values.email, values.password);
          if (data?.data.isverified == false) {
            return toast.error(data?.data.message);
          }
          if (data?.data.IsData == false) {
            return toast.error(data?.data.message);
          }
          console.log("odata", data?.data.data);
          dispatch(setUserCredential(data?.data.data));
          navigate("/home");
          toast.success("Login succussfilly");
        } catch (error) {
          console.log(error);
          toast.error("somthing went wrong while login");
        }
      };
      handleSubmit();
    },
  });
  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gradient-to-r bg-white">
      {/* <img
        src="https://images.stockcake.com/public/9/8/a/98a197a4-ac0d-4d43-b054-9f4eb7814e9b_large/automotive-assembly-line-stockcake.jpg"
        alt="Cover"
        className="absolute inset-0 h-full w-full object-cover rounded-l-lg"
      /> */}
      <div className="h-[85vh] w-[70vh] col-span-6 hidden md:block relative">
        <img
          src="https://images.stockcake.com/public/6/9/0/690cf20f-1cfe-467c-b19f-e5f4b2d3e225_large/worker-welding-metal-stockcake.jpg"
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover rounded-l-lg"
        />
      </div>
      <div className="flex flex-col justify-center h-[85vh] w-[70vh] bg-white p-8 shadow-2xl rounded-r-lg z-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Login
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
                <Link to="/forgetPassword">
                  <a href="#" className="text-indigo-600 hover:text-indigo-800">
                    Forgot Password?
                  </a>
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup">
                  <a href="#" className="text-indigo-600 hover:text-indigo-800">
                    Sign Up
                  </a>
                </Link>
              </p>
            </div>
          </form>
          <div className="mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

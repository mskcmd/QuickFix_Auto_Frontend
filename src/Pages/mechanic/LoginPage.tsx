import  { forwardRef } from "react";
import { useFormik } from "formik";
import { LoginValidation } from "../../Components/Common/Validations";
import { Login } from "../../Api/mechanic";
import { useDispatch } from "react-redux";
import { setMechanicCredential } from "../../app/slice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IinitialValues {
  email: string;
  password: string;
}
const initialValues: IinitialValues = {
  email: "",
  password: "",
};

const LoginPage = forwardRef<HTMLFormElement>((_props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: LoginValidation,
    onSubmit: async (values) => {
      try {
        const data = await Login(values.email, values.password);
        console.log("data", data);
        
        if (data?.data.isverified === false) {
          return toast.error(data?.data.message);
        }
        if (data?.data.IsData === false) {
          return toast.error(data?.data.message);
        }
        dispatch(setMechanicCredential(data?.data.data));
        navigate("/mechanic/home/dashbord");
        toast.success("Login successfully");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gradient-to-r bg-white">
      <div className="h-[85vh] w-[70vh] col-span-6 hidden md:block relative">
        <img
          src="https://img.freepik.com/free-vector/car-service-logo-design_23-2149750690.jpg?t=st=1717655993~exp=1717659593~hmac=2ef181f4aa878c2cc79d4580f692417493b1c54ec45f3bf30737939e5431b020&w=740"
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover rounded-l-lg"
        />
      </div>
      <div className="flex flex-col justify-center h-[85vh] w-[70vh] bg-white shadow-2xl p-8 rounded-r-lg">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Mechanic Login
        </h2>
        <div className="mb-6">
          <form ref={ref} onSubmit={formik.handleSubmit}>
            <input
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Username or Email"
              className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.errors.email && (
              <small className="text-red-500">{formik.errors.email}</small>
            )}

            <input
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Password"
              type="password"
              className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.errors.password && (
              <small className="text-red-500">{formik.errors.password}</small>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-blue-950 transition duration-300"
            >
              Submit
            </button>
            <div className="flex justify-between mt-4">
              <p className="text-sm text-gray-600">
                <Link to="/mechanic/forgetPassword">
                  <span className="text-indigo-600 hover:text-indigo-800">
                    Forgot Password?
                  </span>
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/mechanic/signup">
                  <span className="text-indigo-600 hover:text-indigo-800">
                    Sign Up
                  </span>
                </Link>
              </p>
            </div>
          </form>
          <div className="mt-6"></div>
        </div>
      </div>
    </div>
  );
});

export default LoginPage;

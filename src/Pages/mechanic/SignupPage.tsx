import { useFormik } from "formik";
import { SignupValidation } from "../../Components/Common/Validations";
import { mechanicSingup } from "../../Api/mechanic";
import { Link,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export interface FromData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}

interface initelVal {
  name: string;
  email: string;
  phone: string;
  password: string;
  cpassword: string;

}

const initialValues: initelVal = {
  name: "",
  email: "",
  phone: "",
  password: "",
  cpassword: "",

};

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

 const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: SignupValidation,
    onSubmit: async (values) => {
      const formdata = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        confirmPassword: values.cpassword,
      };
      try {
      const mechData = await mechanicSingup(formdata);
      console.log(mechData?.data.notsuccuss);
      if(mechData?.data.notsuccuss===false){
        toast.error("Email already exists");
      }
     console.log("cc",mechData?.data.succuss);

      if (mechData?.data.succuss===true) {
        console.log(mechData);
        navigate('/mechanic/otp-page');
      } else {
        console.log("not_found");
      }
      
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gradient-to-r bg-white">
      <div className="h-[85vh] w-[80vh] col-span-6 hidden md:block relative">
  <img
    src="https://images.stockcake.com/public/a/f/5/af51da5a-9766-4721-b16d-d235a7e5d8d9_large/focused-mechanic-working-stockcake.jpg"
    alt="Cover"
    className="absolute inset-0 h-full w-full object-cover rounded-l-lg animate-fade-in"
  />
</div>
      <div className="flex flex-col justify-center h-[85vh] w-[75vh] bg-white p-8 rounded-r-lg shadow-2xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 mt-5">
          Mechanic Sign Up
        </h2>
        <div className="mb-6">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Shopname"
              className="w-full  px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && <div className="text-red-600">{errors.name}</div>}
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <div className="text-red-600">{errors.email}</div>}
            <input
              placeholder="Phone Number"
              type="text"
              name="phone"
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.phone && <div className="text-red-600">{errors.phone}</div>}
            <input
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && <div className="text-red-600">{errors.password}</div>}
            <input
              placeholder="Confirm Password"
              type="password"
              name="cpassword"
              value={values.cpassword}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.cpassword && <div className="text-red-600">{errors.cpassword}</div>}
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-blue-950 transition duration-300"
            >
              Submit
            </button>
          </form>
          <div className="mt-6">
            <p className="text-center mt-4 text-gray-600">
              You have an account?{" "}
              <Link  to='/mechanic/login'><a href="#" className="text-indigo-600 hover:text-indigo-800">
                Login
              </a></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

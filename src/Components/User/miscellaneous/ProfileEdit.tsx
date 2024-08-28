import React from "react";
import { FaUserCircle, FaPhone, FaSave, FaCamera } from "react-icons/fa";
import { useAppSelector } from "../../../app/store";
import { updateProfile } from "../../../Api/user";
import { useFormik } from "formik";
import { updateProfileValidation } from "../../Common/Validations";

const ProfileEditContent: React.FC = () => {
  const userData = useAppSelector((state) => state.auth.userData);
  const id: string = userData?.userId || "";

  const formik = useFormik({
    initialValues: {
      name: userData?.data.name || "",
      phone: userData?.data.phone || "",
      image: null as File | null,
    },
    validationSchema:updateProfileValidation,
    onSubmit: async (values) => {
      console.log("Profile update submitted", values);
      try {
        await updateProfile(id, values.name, values.phone, values.image);
        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Failed to update profile", error);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("image", e.target.files[0]);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
        Edit Profile
      </h2>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="relative bg-gradient-to-r from-purple-400 to-pink-500 rounded-full h-40 w-40 flex items-center justify-center shadow-lg mb-6 md:mb-0">
            <input
              type="file"
              accept="image/*"
              id="file-input"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {formik.values.image ? (
              <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <FaUserCircle className="text-white text-7xl" />
            )}
            <label
              htmlFor="file-input"
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer"
            >
              <FaCamera className="text-purple-600 text-xl" />
            </label>
          </div>
          <div className="md:ml-12 space-y-6 flex-grow">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
              <FaUserCircle className="text-purple-600 text-xl mr-4" />
              <div className="w-full">
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm">{formik.errors.name}</div>
                ) : null}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center">
              <FaPhone className="text-purple-600 text-xl mr-4" />
              <div className="w-full">
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <input
                  type="tel"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
          >
            <FaSave className="mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditContent;

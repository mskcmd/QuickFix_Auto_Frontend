/* eslint-disable @typescript-eslint/no-explicit-any */
import exp from "constants";
import * as Yup from "yup";

const MOBILE_NUM_REGEX = /^[0-9]{10}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SignupValidation = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(MOBILE_NUM_REGEX, "Phone number is not valid")
    .required("Phone number is required"),
  password: Yup.string()
    .matches(
      PASSWORD_REGEX,
      "Password must be 8+ chars with upper, lower, number, and special char"
    )
    .required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const LoginValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const RegisterValidation = Yup.object({
  role: Yup.string().required("Role is required"),
  name: Yup.string().required("Name is required"),
  location: Yup.string().required("Location is required"),
  services: Yup.string().required("Services are required"),
  employeeCount: Yup.string()
    // .matches(/^\d+$/, 'Employee count must be a number')
    .required("Employee count is required"),
  companyCertificate: Yup.string().required("Company certificate is required"),
  licenseNumber: Yup.string().required("License number is required"),
  images: Yup.string().required("Images are required"),
  companyDescription: Yup.string().required("Company description is required"),
  experience: Yup.string().required("Experience is required"),
});

export const EmailValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email must be in a valid format (e.g., example@example.com)"
    )
    .required("Email is required"),
});

export const ResetPasswordValidation = Yup.object({
  newPassword: Yup.string()
    .matches(
      PASSWORD_REGEX,
      "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const updateProfileValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number is not valid"),
});

export const generateNewBillSchema = Yup.object().shape({
  userId: Yup.string().required("User ID is required"),
  name: Yup.string().required("Customer name is required"),
  vehicleNumber: Yup.string().required("Vehicle number is required"),
  services: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Service name is required"),
        price: Yup.number()
          .min(0, "Price must be non-negative")
          .required("Price is required"),
      })
    )
    .min(1, "At least one service is required"),
  mechId: Yup.string().required("Mechanic ID is required"),
});

export const FeedbackSchema = Yup.object().shape({
  rating: Yup.number().min(1, "Please provide a rating"),
  feedback: Yup.string()
    .min(10, "Feedback must be at least 10 characters")
    .required("Rating is required"),
});


import { AxiosResponse } from "axios";
import { FromData } from "../Pages/user/SignupPage"
import userRoutes from "../Services/Endpoints/userEndPoints";
import Api from "../Services/axios";
import { FormDatas } from "../Components/User/BookingForm";
import { BookingFormData } from "../Pages/user/MechBooking";

export const signup = async ({ name, email, phone, password }: FromData) => {
    try {
        console.log("haoi", name, email, phone, password);

        const result = await Api.post(userRoutes.signup, { name, email, phone, password })
        console.log("result", result);

        if (result.status == 200) {
            return result
        }
    } catch (error) {
        console.log(error);

    }
}

export const verifyOtp = async (otpnum: string) => {
    try {
        const otp = parseInt(otpnum);
        const result = await Api.post(userRoutes.veryfyOtp, { otp })
        console.log("otp", result);
        if (result.status) {
            return result
        }
    } catch (error) {
        console.log(error)
    }
}

export const Login = async (email: string, password: string) => {
    try {
        console.log("hai sir");

        const result = await Api.post(userRoutes.Login, { email, password })
        console.log("eeee", result);
        return result
    } catch (error) {
        console.log(error);

    }
}

export const resendOtp = async () => {
    try {
        const result = await Api.get(userRoutes.resendOtp);
        console.log("resendOtp", result);
        return result
    } catch (error) {
        console.log(error as Error);
    }
}

export const forgetPassword = async (email: string) => {
    try {
        console.log("email", email);
        const result = await Api.get(userRoutes.forgetPassword, { params: { email } });
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
};
export const resetPassword = async (password: string, userId: string) => {
    try {
        console.log("rgtre", password, userId);

        const result = await Api.post(userRoutes.resetPassword, { password, userId })
        console.log("", result);
        return result
    } catch (error) {
        console.log(error);
    }
};



export const verifyOtpReset = async (otpnum: string, userId: string) => {
    try {
        console.log("k", otpnum, userId);

        const otp = parseInt(otpnum);
        const result = await Api.get(userRoutes.veryfyOtpreset, { params: { otp, userId } });
        console.log("otp", result);
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

export const logout = async () => {
    try {
        return await Api.get(userRoutes.userLogout)
    } catch (error) {
        console.log(error);

    }
}

export const searchMechShop = async (formData: FormDatas): Promise<FormDatas | null> => {
    try {
        console.log("Form data is validf", formData);
        const response: AxiosResponse<FormDatas> = await Api.get(userRoutes.searchMech, {
            params: formData
        });
        console.log(response);

        return response.data;
    } catch (error) {
        console.error('Error searching for mechanic shops:', error);
        return null;
    }
};

export const booking = async (formData: BookingFormData) => {
    try {
        console.log("Submitting booking data:", formData);
        const result = await Api.post(userRoutes.booking, formData);
        return result;
    } catch (error) {
        console.error("Error during booking API call:", error);
        throw error;
    }
};

export const fetchBookData = async (id: string, type: string) => {
    try {
        console.log("fetchBookData data:", id, type);
        const result = await Api.get(userRoutes.fetchBookData, {
            params: { id, type }
        });
        return result.data; 
    } catch (error) {
        console.error("Error during fetchBookData API call:", error);
        throw error;
    }
};

export const updateProfile = async (
    id: string, 
    name: string, 
    phone: string, 
    image: File | null
  ) => {
    try {
      console.log("updateProfile data:", { id, name, phone, image });
  
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("phone", phone);
      if (image) {
        formData.append("image", image);
      }
      
      const result = await Api.post(userRoutes.updateProfle, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      console.log("Successfully updated:", result);
    } catch (error) {
      console.error("Error during updateProfile API call:", error);
      throw error;
    }
  };
  

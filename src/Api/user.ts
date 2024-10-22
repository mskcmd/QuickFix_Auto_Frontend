
import { AxiosResponse } from "axios";
import { FromData } from "../Pages/user/SignupPage"
import userRoutes from "../Services/Endpoints/userEndPoints";
import Api from "../Services/axios";
import { BookingFormData } from "../Pages/user/MechBooking";
import errorHandler from "./errorHandler";

export const signup = async ({ name, email, phone, password }: FromData) => {
    try {     
           
        const result = await Api.post(userRoutes.signup, { name, email, phone, password })
        if (result.status == 200) {
            return result
        }
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const verifyOtp = async (otpnum: string) => {
    try {
        const otp = parseInt(otpnum);
        const result = await Api.post(userRoutes.veryfyOtp, { otp })
        if (result.status) {
            return result
        }
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const Login = async (email: string, password: string) => {
    try {        
        const result = await Api.post(userRoutes.Login, { email, password })        
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const googleLogin = async (name: string | null, email: string | null, googlePhotoUrl: string | null) => {
    try {
        if (!name || !email) return;
        const result = await Api.post(userRoutes.googleLogin, { name, email, googlePhotoUrl })
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const resendOtp = async () => {
    try {
        const result = await Api.get(userRoutes.resendOtp);
        return result
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const forgetPassword = async (email: string) => {
    try {
        const result = await Api.get(userRoutes.forgetPassword, { params: { email } });
        console.log(result);
        return result
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const resetPassword = async (password: string, userId: string) => {
    try {
        const result = await Api.post(userRoutes.resetPassword, { password, userId })
        return result
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const verifyOtpReset = async (otpnum: string, userId: string) => {
    try {
        const otp = parseInt(otpnum);
        const result = await Api.get(userRoutes.veryfyOtpreset, { params: { otp, userId } });
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const logout = async () => {
    try {
        return await Api.get(userRoutes.userLogout)
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const getProfile = async () => {
    try {
        const result = await Api.get(userRoutes.getProfile)
        return result
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const searchMechShop = async (formData: any): Promise<any | null> => {
    try {
        const response: AxiosResponse<any> = await Api.get(userRoutes.searchMech, {
            params: formData
        });

        return response.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const booking = async (formData: BookingFormData) => {
    try {        
        const result = await Api.post(userRoutes.booking, formData);
        return result;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const fetchBookData = async (id: string, type: string) => {
    try {
        const result = await Api.get(userRoutes.fetchBookData, {
            params: { id, type }
        });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const updateProfile = async (
    id: string,
    name: string,
    phone: string,
    image: File | null
) => {
    try {

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
        return result

    } catch (error) {
        console.error("Error during updateProfile API call:", error);
        throw error;
    }
};


export const searchChatData = async (search: string) => {
    try {
        const result = await Api.get(`/user/chat/allUsers?search=${search}`);
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const allAccessChat = async (receiverId: string, senderId: string) => {
    try {
        const result = await Api.post(`/user/chat/create`, { senderId, receiverId });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};


export const fetchChats = async (senderId: string) => {
    try {
        const result = await Api.get('/user/chat/fetchChats', {
            params: { senderId }
        });
        return result.data; // Return the data directly
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};


export const allMessages = async (chatId: string) => {
    try {
        const result = await Api.get(`/user/chat/allMesssge/${chatId}`);
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

interface SendMessageParams {
    content: string;
    chatId: string;
    senderId: string;
}

export const sendMessages = async ({ content, chatId, senderId }: SendMessageParams) => {
    try {
        const result = await Api.post('/user/chat/sendMessage', { content, chatId, senderId });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const fetchPymnetData = async (id: string) => {
    try {
        const result = await Api.get(userRoutes.fetchPayment, { params: { id } })
        return result.data

    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const updatePaymnt = async (paymentId: string, status: string) => {
    try {
        const result = await Api.post(userRoutes.updatePaymnt, { paymentId, status })
        return result.data

    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const createFeedback = async (
    values: { rating: number; feedback: string },
    id: string,
    mechId: string,
    paymentId: string
): Promise<any> => {
    try {
        const result = await Api.post(userRoutes.cretateFeedback, { values, id, mechId, paymentId });
        return result.data;

    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const fetchBlogs = async () => {
    try {
        const result = await Api.get(userRoutes.fetchBlogs)
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const fetchAllBlogs = async () => {
    try {
        const result = await Api.get(userRoutes.fetchAllBlogs)
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const fetchServiceData = async () => {
    try {
        const result = await Api.get(userRoutes.fetchAllService)
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const fetchShopData = async (data: string) => {
    try {
        const result = await Api.get(`${userRoutes.fetchAllshop}?query=${data}`);
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const fetchFreelancersData = async () => {
    try {
        const result = await Api.get(userRoutes.fetchFreelancersData)
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const bookingdata = async (id: string) => {
    try {
        const result = await Api.get(userRoutes.bookingdata, { params: { id } })
        return result.data
        
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const updateFeedback = async (id: string, values: string) => {
    try {
        const result = await Api.post(userRoutes.updateFeedback, { id, values });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const fetchreview = async (id: string) => {
    try {
        const result = await Api.get(userRoutes.reviewData, { params: { id } })
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}







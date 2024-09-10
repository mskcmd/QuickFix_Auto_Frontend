import { AxiosResponse } from "axios";
import { MechanicFormData } from "../Pages/mechanic/RegisterOne";
import { FromData } from "../Pages/mechanic/SignupPage"
import mechanicRoute from "../Services/Endpoints/mechanicEndPointes";
import Api from "../Services/axios";
import { MechanicDataItem } from "../Components/Mechanic/MechanicCommen/MechanicLoggedin";
import { FormikValues } from "formik";


export const mechanicSingup = async ({ name, email, phone, password }: FromData) => {
    try {
        console.log(name, email, phone, password);
        const mechData = await Api.post(mechanicRoute.signup, { name, email, phone, password })
        return mechData

    } catch (error) {
        console.log(error);

    }


}

export const verifyOtp = async (otpnum: string) => {
    try {
        const otp = parseInt(otpnum);
        console.log("yu", otp);

        const result = await Api.post(mechanicRoute.veryfyOtp, { otp })
        console.log("otp", result);
        if (result.data.succuss) {
            return result
        }
    } catch (error) {
        console.log(error)
    }
}

export const resendOtp = async () => {
    try {
        await Api.get(mechanicRoute.resendOtp);
    } catch (error) {
        console.log(error as Error);
    }
}

export const Login = async (email: string, password: string) => {
    try {
        const result = await Api.post(mechanicRoute.Login, { email, password })
        console.log("dsf", result);
        return result
    } catch (error) {
        console.log(error);

    }
}

export const forgetPassword = async (email: string) => {
    try {
        console.log("email", email);
        const result = await Api.get(mechanicRoute.forgetPassword, { params: { email } });
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
};

export const verifyOtpReset = async (otpnum: string, userId: string) => {
    try {
        console.log("k", otpnum, userId);

        const otp = parseInt(otpnum);
        const result = await Api.get(mechanicRoute.veryfyOtpreset, { params: { otp, userId } });
        console.log("otp", result);
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

export const resetPassword = async (password: string, userId: string) => {
    try {
        console.log("rgtre", password, userId);
        const result = await Api.post(mechanicRoute.resetPassword, { password, userId })
        console.log("", result);
        return result
    } catch (error) {
        console.log(error);
    }
};

export const mechanicRegister = async (mechanicData: MechanicFormData, mechanicId: string | undefined): Promise<AxiosResponse<unknown>> => {
    try {
        const formData = new FormData();

        // Append basic fields
        if (mechanicId) {
            formData.append('ID', mechanicId);
        }
        formData.append('type', mechanicData.type);
        formData.append('licenseNumber', mechanicData.licenseNumber);
        formData.append('yearsOfExperience', mechanicData.yearsOfExperience);
        formData.append('specialization', mechanicData.specialization);
        formData.append('latitude', mechanicData.latitude);
        formData.append('longitude', mechanicData.longitude);
        formData.append('district', mechanicData.district);
        formData.append('locationName', mechanicData.locationName);
        formData.append('description', mechanicData.description);

        // Append files
        if (mechanicData.certificate) {
            formData.append('certificate', mechanicData.certificate);
        }
        if (mechanicData.profileImages && mechanicData.profileImages.length > 0) {
            mechanicData.profileImages.forEach((file, index) => {
                formData.append(`profileImage${index}`, file);
            });
        }

        // Append services
        mechanicData.services.forEach((service, index) => {
            formData.append(`services[${index}]`, service);
        });

        // Append working hours
        mechanicData.workingHours.forEach((schedule, index) => {
            formData.append(`workingHours[${index}][days]`, JSON.stringify(schedule.days));
            formData.append(`workingHours[${index}][startTime]`, schedule.startTime);
            formData.append(`workingHours[${index}][endTime]`, schedule.endTime);
        });

        // Send the request
        const result = await Api.post(mechanicRoute.Register, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("Registration result:", result);
        return result;

    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};
export const getmechData = async (mechanicId: string): Promise<MechanicDataItem[]> => {
    try {
        const result = await Api.get<MechanicDataItem[]>(mechanicRoute.getData, { params: { Id: mechanicId } });
        return result.data;
    } catch (error) {
        console.error("Error fetching mechanic data:", error);
        throw error;
    }
};

export const getDetailesData = async (mechanicId: string) => {
    try {
        console.log("Fetching dasta for mechanic ID:", mechanicId);
        const result = await Api.get(mechanicRoute.getMcechData, { params: { Id: mechanicId } });
        return result.data;
    } catch (error) {
        console.error("Error fetching mechanic data:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        return await Api.get(mechanicRoute.mechLogout)
    } catch (error) {
        console.log(error);

    }
}

export const fetchUsers = async (mechanicId: string) => {
    try {
        console.log("Fetching dasta for mechanic ID:", mechanicId);
        const result = await Api.get(mechanicRoute.fetchUsers, { params: { Id: mechanicId } });
        return result;
    } catch (error) {
        console.error("Error fetching users data:", error);
        throw error;
    }
};

export const statusUpdate = async (bookingId: string, newStatus: string) => {
    try {
        console.log(`Changing status for user 2ff  ${bookingId} to ${newStatus}`);
        const result = await Api.put(mechanicRoute.statusChange, { params: { Id: bookingId, Status: newStatus } });
        return result;
    } catch (error) {
        console.error("Error fetching users data:", error);
        throw error;
    }
};

export const addService = async (name: string, details: string, price: string, imageFile: File, id: string) => {
    try {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', imageFile);
        formData.append('name', name);
        formData.append('details', details);
        formData.append('price', price.toString());

        console.log(formData);

        const uploadResponse = await Api.post(mechanicRoute.addService, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Service added successfully', uploadResponse.data);
        return uploadResponse.data
    } catch (error) {
        console.error('Error adding service:', error);
    }
};

export const fetchService = async (id: string) => {
    try {
        const result = await Api.get(mechanicRoute.fetchService, { params: { id } });
        return result.data;
    } catch (error) {
        console.error("Error in fetchService:", error);
        throw error; // Re-throw the error if you want the calling function to handle it
    }
};

export const searchUsers = async (search: string, id: string) => {
    try {
        console.log(search, id);
        const result = await Api.get(`${mechanicRoute.searchUsers}?search=${search}&id=${id}`)
        return result.data;
    } catch (error) {
        console.error("Error in fetchUsers:", error);
        throw error;
    }
};


export const searchServices = async (search: string, id: string) => {
    try {
        console.log(search, id);
        const result = await Api.get(`${mechanicRoute.searchServices}?search=${search}&id=${id}`)
        console.log("ss", result.data);
        return result.data;
    } catch (error) {
        console.error("Error in fetchUsers:", error);
        throw error;
    }
};

export const createBill = async (value: FormikValues) => {
    try {
        const result = await Api.post(mechanicRoute.CreateBill, value);
        console.log('Bill created successfully:', result.data);
        return result.data;
    } catch (error) {
        console.error('Error creating bill:', error);
        throw error;
    }
};


export const createBlog = async (values: any, id: string) => {
    try {
        const formData = new FormData();

        formData.append('id', id);
        formData.append('name', values.name);
        formData.append('positionName', values.positionName);
        formData.append('heading', values.heading);
        formData.append('description', values.description);

        if (values.image) {
            formData.append('image', values.image);
        }

        const result = await Api.post(mechanicRoute.createBlog, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("Blog created successfully:", result);
        return result

    } catch (error) {
        console.error("Error creating blog:", error);
    }
};

export const fetchBlog = async (id: string) => {
    try {
        const result = await Api.get(mechanicRoute.fetchBlog, { params: { id } });
        return result.data;
    } catch (error) {
        console.error("Error in fetchBlog:", error);
        throw error;
    }
};

export const deleteBlog = async (id: string) => {
    try {        
        const result = await Api.delete(mechanicRoute.deleteBlog, { params: { id } });
        return result.data;
    } catch (error) {
        console.error("Error in fetchBlog:", error);
        throw error;
    }
};

export const fetchEditBlog = async (id: string) => {
    try {        
        const result = await Api.get(mechanicRoute.fetchEditBlog, { params: { id } });
        return result.data;
    } catch (error) {
        console.error("Error in fetchBlog:", error);
        throw error;
    }
};

export const updateBlog = async (id: any, values: any) => {
    try {

        console.log("drt",values.image);
        
        const formData = new FormData();

        formData.append('id', id);
        formData.append('name', values.name);
        formData.append('positionName', values.positionName);
        formData.append('heading', values.heading);
        formData.append('description', values.description);

        if (values.image) {
            formData.append('image', values.image);
        }

        const result = await Api.post(mechanicRoute.editBlog, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("Blog created successfully:", result);
        return result

    } catch (error) {
        console.error("Error creating blog:", error);
    }
};

export const paymentFetch = async (id: string) => {
    try {
        const result = await Api.get(mechanicRoute.paymentFetch, { params: { id } })
        return result.data

    } catch (error) {
        console.log(error);

    }
}




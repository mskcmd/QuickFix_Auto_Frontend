import { MechanicFormData } from "../Pages/mechanic/RegisterOne";
import { FromData } from "../Pages/mechanic/SignupPage"
import mechanicRoute from "../Services/Endpoints/mechanicEndPointes";
import Api from "../Services/axios";
import { MechanicDataItem } from "../Components/Mechanic/MechanicCommen/MechanicLoggedin";
import { FormikValues } from "formik";
import errorHandler from "./errorHandler";


export const mechanicSingup = async ({ name, email, phone, password }: FromData) => {
    try {
        const mechData = await Api.post(mechanicRoute.signup, { name, email, phone, password })
        return mechData

    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }


}

export const verifyOtp = async (otpnum: string) => {
    try {
        const otp = parseInt(otpnum);

        const result = await Api.post(mechanicRoute.veryfyOtp, { otp })
        if (result.data.succuss) {
            return result
        }
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const resendOtp = async () => {
    try {
        await Api.get(mechanicRoute.resendOtp);
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const Login = async (email: string, password: string) => {
    try {
        const result = await Api.post(mechanicRoute.Login, { email, password })
        return result
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const forgetPassword = async (email: string) => {
    try {
        const result = await Api.get(mechanicRoute.forgetPassword, { params: { email } });
        return result
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const verifyOtpReset = async (otpnum: string, userId: string) => {
    try {
        const otp = parseInt(otpnum);
        const result = await Api.get(mechanicRoute.veryfyOtpreset, { params: { otp, userId } });
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const resetPassword = async (password: string, userId: string) => {
    try {
        const result = await Api.post(mechanicRoute.resetPassword, { password, userId })
        return result
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const mechanicRegister = async (mechanicData: MechanicFormData, mechanicId: string | undefined): Promise<any> => {
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
        return result;

    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const getmechData = async (mechanicId: string): Promise<any> => {
    try {
        const result = await Api.get<MechanicDataItem[]>(mechanicRoute.getData, { params: { Id: mechanicId } });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const getDetailesData = async (mechanicId: string) => {
    try {
        const result = await Api.get(mechanicRoute.getMcechData, { params: { Id: mechanicId } });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const logout = async () => {
    try {
        return await Api.get(mechanicRoute.mechLogout)
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const fetchUsers = async (mechanicId: string) => {
    try {
        const result = await Api.get(mechanicRoute.fetchUsers, { params: { Id: mechanicId } });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const statusUpdate = async (bookingId: string, newStatus: string) => {
    try {
        const result = await Api.put(mechanicRoute.statusChange, { params: { Id: bookingId, Status: newStatus } });
        return result;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
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

        return uploadResponse.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const fetchService = async (id: string) => {
    try {
        const result = await Api.get(mechanicRoute.fetchService, { params: { id } });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const searchUsers = async (search: string, id: string) => {
    try {
        const result = await Api.get(`${mechanicRoute.searchUsers}?search=${search}&id=${id}`)
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};


export const searchServices = async (search: string, id: string) => {
    try {
        const result = await Api.get(`${mechanicRoute.searchServices}?search=${search}&id=${id}`)
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const createBill = async (value: FormikValues) => {
    try {
        const result = await Api.post(mechanicRoute.CreateBill, value);
        console.log(result.data);

        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
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
        return result

    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const fetchBlog = async (id: string) => {
    try {
        const result = await Api.get(mechanicRoute.fetchBlog, { params: { id } });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const deleteBlog = async (id: string) => {
    try {
        const result = await Api.delete(mechanicRoute.deleteBlog, { params: { id } });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const fetchEditBlog = async (id: string) => {
    try {
        const result = await Api.get(mechanicRoute.fetchEditBlog, { params: { id } });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const updateBlog = async (id: any, values: any) => {
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

        const result = await Api.post(mechanicRoute.editBlog, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return result

    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const paymentFetch = async (id: string) => {
    try {
        const result = await Api.get(mechanicRoute.paymentFetch, { params: { id } })
        return result.data

    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const fetchRevenue = async (id: string) => {
    try {
        const result = await Api.get(mechanicRoute.fetchmonthlyRevenue, { params: { id } })
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const userGrowths = async (id: string) => {
    try {
        const result = await Api.get(mechanicRoute.userGrowths, { params: { id } })
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const fetchMechData = async (id: string) => {
    try {
        console.log(id);
        const result = await Api.get(mechanicRoute.fetchMechData, { params: { id } })
        return result.data
    } catch (error) {
        // console.log(error as Error);
        // errorHandler(error as Error);
    }
};





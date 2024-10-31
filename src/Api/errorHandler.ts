import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userLogout } from "../app/slice/AuthSlice";

type ErrorResponse = {
    message: string,
    success: Boolean
}

const errorHandler = async (error: Error | AxiosError) => {
    const dispatch = useDispatch();

    const axiosError = error as AxiosError;

    if (axiosError.response?.data) {
        const errorResponse = axiosError.response.data as ErrorResponse
        if (errorResponse.message === "User is blocked by admin!") {
            toast.error(errorResponse.message);
        } else if (errorResponse.message === "Professional is blocked by admin!") {
            toast.error(errorResponse.message);
        } else if (errorResponse.message === "Refresh token not available") {
            dispatch(userLogout());
            toast.error(errorResponse.message);
        } else {
            toast.error(errorResponse.message);
        }
    } else {
        toast.error('Something went wrong. Please try again!');
    }

}

export default errorHandler


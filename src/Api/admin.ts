import Api from "../Services/axios";
import adminRoute from "../Services/Endpoints/adminEndPoints";
import errorHandler from "./errorHandler";

export const Login = async (email: string, password: string) => {
    try {
        const result = await Api.post(adminRoute.Login, { email, password })
        return result
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const getUseRData = async () => {
    try {
        const result = await Api.get(adminRoute.GetUserData)
        return result
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const getMechData = async () => {
    try {
        const result = await Api.get(adminRoute.GetMechData)
        return result
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const logout = async () => {
    try {
        return await Api.get(adminRoute.adminLogout)
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const blockUser = async (userId: string) => {
    try {
        const result = await Api.put(`${adminRoute.userBlock}?userId=${userId}`);
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const monthlyDatas = async () => {
    try {
        const result = await Api.get(adminRoute.monthlyData)
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

export const handlemechBlock = async (userId: string) => {
    try {
        const result = await Api.put(`${adminRoute.mechBlock}?userId=${userId}`);
        return result.data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}

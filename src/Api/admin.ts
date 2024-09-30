import Api from "../Services/axios";
import adminRoute from "../Services/Endpoints/adminEndPoints";

export const Login = async (email: string, password: string) => {
    try {
        const result = await Api.post(adminRoute.Login, { email, password })
        console.log("hai", result);
        return result
    } catch (error) {
        console.log(error);

    }
}

export const getUseRData = async () => {
    try {
        const result = await Api.get(adminRoute.GetUserData)
        return result
    } catch (error) {
        console.log(error);

    }
}

export const getMechData = async () => {
    try {
        const result = await Api.get(adminRoute.GetMechData)
        console.log("mech)data", result);
        return result
    } catch (error) {
        console.log(error);

    }
}

export const logout = async () => {
    try {
        return await Api.get(adminRoute.adminLogout)
    } catch (error) {
        console.log(error);

    }
}

export const blockUser = async (userId: string) => {
    try {
        console.log("user id:", userId);
        const result = await Api.put(`${adminRoute.userBlock}?userId=${userId}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const monthlyDatas = async () => {
    try {
        const result = await Api.get(adminRoute.monthlyData)
        return result.data
    } catch (error) {
        console.log();

    }
}

export const handlemechBlock = async (userId:string)=>{
    try {
        console.log("eeeeeee", userId);
        const result = await Api.put(`${adminRoute.mechBlock}?userId=${userId}`);
        return result.data
    } catch (error) {
       console.log(error);
        
    }
}

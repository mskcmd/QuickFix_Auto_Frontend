import Api from "../Services/axios";
import errorHandler from "./errorHandler";


export const searchChatData = async (search: string) => {
    try {
        const result = await Api.get(`/mechanic/usersdata?search=${search}`);
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const allAccessChat = async (receiverId: string, senderId: string) => {
    try {
        const result = await Api.post(`/mechanic/create`, { senderId, receiverId });
        return result.data; // Make sure to return the actual data
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const sendMessages = async ({ content, chatId, senderId }: any) => {

    try {
        const result = await Api.post('/mechanic/sendMessage', { content, chatId, senderId });
        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};

export const allMessages = async (chatId: string) => {

    try {
        const result = await Api.get(`/mechanic/allMesssge/${chatId}`);

        return result.data;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}


export const fetchChats = async (senderId: string) => {
    try {
        const result = await Api.get('/mechanic/fetchChats', {
            params: { senderId }
        });
        return result.data; // Return the data directly
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
};
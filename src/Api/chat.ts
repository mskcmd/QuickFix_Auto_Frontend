import Api from "../Services/axios";


export const searchChatData = async (search: string) => {
    try {
        console.log(search);
        const result = await Api.get(`/mechanic/usersdata?search=${search}`);
        console.log("usedfgrs", result.data);
        return result.data;
    } catch (error) {
        console.error("Error fetching chat data:", error);
        throw error;
    }
};

export const allAccessChat = async (receiverId: string, senderId: string) => {
    try {
        console.log(receiverId, senderId);

        const result = await Api.post(`/mechanic/create`, { senderId, receiverId });
        console.log("qchat", result.data);
        return result.data; // Make sure to return the actual data
    } catch (error) {
        console.error("Error fetching chat data:", error);
        throw error; // Ensure errors are thrown to be caught in the component
    }
};

export const sendMessages = async ({ content, chatId, senderId }: any) => {
    console.log('AA',content, chatId, senderId);

    try {
        const result = await Api.post('/mechanic/sendMessage', { content, chatId, senderId });
        console.log("fg", result.data);
        return result.data;
    } catch (error) {
        console.error("Failed to send messages", error);
        throw error;
    }
};

export const allMessages = async (chatId: string) => {
    console.log("sss", chatId);

    try {
        const result = await Api.get(`/mechanic/allMesssge/${chatId}`);
        console.log("all message", result.data);

        return result.data;
    } catch (error) {
        console.error("Failed to fetch messages", error);
        throw error; // Rethrow the error so it can be handled where the function is called
    }
}


export const fetchChats = async (senderId: string) => {
    try {
        const result = await Api.get('/mechanic/fetchChats', {
            params: { senderId }
        });
        console.log("sd", result.data);
        return result.data; // Return the data directly
    } catch (error) {
        console.error("Error fetching chat data:", error);
        throw error; // Rethrow error for proper handling in the component
    }
};
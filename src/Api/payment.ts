import Api from "../Services/axios";
import userRoutes from "../Services/Endpoints/userEndPoints";
import errorHandler from "./errorHandler";



export const checkoutService = async (item: any) => {
  try {
    const response = await Api.post(userRoutes.checkOut, item);
    return response;
  } catch (error) {
    console.log(error as Error);
    errorHandler(error as Error);
  }
};

export const chekFeedback = async (id: string) => {
  try {
    const result = await Api.get(userRoutes.chekFeedback, { params: { id } });
    return result.data;
  } catch (error) {
    console.log(error as Error);
    errorHandler(error as Error);
  }
};


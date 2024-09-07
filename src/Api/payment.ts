import Api from "../Services/axios";
import userRoutes from "../Services/Endpoints/userEndPoints";



export const checkoutService = async (item: any) => {
  try {
    console.log("item", item);
    const response = await Api.post(userRoutes.checkOut, item);
    console.log("response",response);
    
    return response;
  } catch (error) {
    console.log('Checkout error:', error);
    throw error;
  }
};


import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchCartByUserId = (userId) => {
  const url = baseUrl + "/cart";
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(url, userId);

      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      toast.error("Something wrong!");
      reject("Something wrong");
    }
  });
};

export const addToCart = (data) => {
  const url = baseUrl + "/cart/add";
  if (!data?.userId) {
    return toast.error("Login is expired.");
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(url, data);
      if (response.status === 200) {
        toast.success("Item added in cart.");
        resolve(response.data);
      }
    } catch (error) {
      toast.error("Something wrong!");
      reject("Something wrong");
    }
  });
};

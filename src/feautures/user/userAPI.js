import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchUserById = (userId) => {
  const url = baseUrl + "/user/own";
  return new Promise(async (resolve) => {
    try {
      const response = await axios.post(url, userId, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (err) {
      toast.error("user error!");
    }
  });
};

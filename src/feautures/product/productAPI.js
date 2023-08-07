import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export async function fetchProducts() {
  return new Promise(async (resolve) => {
    try {
      const url = baseUrl + "/products";
      const response = await axios.get(url);

      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      toast.error("Something wrong!");
    }
  });
}

export async function fetchProductById(productId) {
  const url = baseUrl + "/products/" + productId;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        toast.error("Product not found");
        reject("Product not found");
      }
      toast.error("Something wrong!");
    }
  });
}
import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const createUser = (userData) => {
  const url = baseUrl + "/auth/signUp";
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(url, userData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        const error = err.response?.data;
        toast.error(error?.message);
        reject(error);
      }

      reject("Somthing wrong in auth");
    }
  });
};

export const loginUser = (loginData) => {
  const url = baseUrl + "/auth/login";
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(url, loginData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        toast.success("Login successfull.");
        resolve(res.data);
      }
    } catch (err) {
      const error = err.response?.data;
      if (error) {
        reject(error?.message);
        toast.error(error?.message?.email || error?.message?.password);
      } else {
        toast.error("somthing went wrong!");
      }
    }
  });
};

let fetching = false;

export const checkAuth = () => {
  const url = baseUrl + "/auth/check";
  if (fetching) return;

  fetching = true;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = {
          id: response.data.id,
          email: response.data.email,
          role: response.data.role,
        };
        resolve(data);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        reject({ message: "Unauthorized" });
      }
    } finally {
      fetching = false;
    }
  });
};

export const logout = () => {
  const url = baseUrl + "/auth/logout";
  return new Promise(async () => {
    try {
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Logout success.");
        window.location = "/";
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  });
};

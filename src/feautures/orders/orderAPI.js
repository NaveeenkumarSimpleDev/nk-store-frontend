import axios from "axios";
import { toast } from "react-hot-toast";
import { addAddressLocally, deleteAddressLocally } from "./orderSlice";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export async function fetchOrdersByUserId(userId) {
  const url = baseUrl + "/orders";

  if (!userId) return;
  return new Promise(async (resolve) => {
    try {
      const res = await axios.post(url, { userId });

      if (res.status === 200) {
        resolve(res.data);
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  });
}

export async function createAddress(data) {
  const url = baseUrl + "/address/create";

  if (!data || !data?.userId) return;
  return new Promise(async (resolve) => {
    try {
      const res = await axios.post(url, data);

      if (res.status === 200) {
        resolve(res.data);
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  });
}
export async function updateAddress(data) {
  const url = baseUrl + "/address/update";

  if (!data || !data?.userId) return;
  return new Promise(async (resolve) => {
    try {
      const res = await axios.post(url, data);

      if (res.status === 200) {
        resolve(res.data);
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  });
}
export async function deleteAddress(data, dispatch) {
  const url = baseUrl + "/address/delete";

  if (!data) return;
  dispatch(deleteAddressLocally({ id: data.id }));
  return new Promise(async (resolve) => {
    try {
      const res = await axios.post(url, { id: data.id, userId: data.userId });

      if (res.status === 200) {
        // resolve(res.data);
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      dispatch(addAddressLocally(data));
    }
  });
}

export async function fetchAddressByUserId(userId) {
  const url = baseUrl + "/address";

  if (!userId) return;
  return new Promise(async (resolve) => {
    try {
      const res = await axios.post(url, { userId });

      if (res.status === 200) {
        resolve(res.data);
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  });
}

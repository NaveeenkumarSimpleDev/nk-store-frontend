import axios from "axios";
import { toast } from "react-hot-toast";
import { updateCartLocally } from "./cartSlice";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchCartByUserId = (userId) => {
  const url = baseUrl + "/cart";
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(url, userId, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      // toast.error("Something wrong!");
      console.log("CART_ERROR", error);

      reject("Something wrong");
    }
  });
};

export const addToCart = (data) => {
  const url = baseUrl + "/cart/add";
  if (!data?.userId) {
    return toast.error("Please login.");
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Item added in cart.");
        resolve(response.data);
      }
    } catch (error) {
      toast.error("Something wrong!");
      console.log("CART_ERROR", error);

      reject("Something wrong");
    }
  });
};

let cancelTokenSource;

export const updateCart = async (data, dispatch) => {
  const url = baseUrl + "/cart/update";
  if (!data?.userId) {
    return toast.error("Login is expired.");
  }
  if (cancelTokenSource) {
    cancelTokenSource.cancel("Operation canceled by the user.");
  }

  dispatch(
    updateCartLocally({
      id: data.variationId,
      type: data.type,
    })
  );
  cancelTokenSource = axios.CancelToken.source();
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
      cancelToken: cancelTokenSource.token,
    });
  } catch (error) {
    console.log("CART_ERROR", error);
  }
};

export const resetCart = (data) => {
  const url = baseUrl + "/cart/reset";

  return new Promise(async (resolve, reject) => {
    if (!data) return;
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      toast.error("Something wrong!");
      reject("Something wrong");
    } finally {
      cancelTokenSource = null;
    }
  });
};

export const handleCheckout = (data) => {
  const url = baseUrl + "/checkout";
  if (!data) return;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject("Something wrong!");
      }
    } catch (error) {
      console.log("CHECKOUT_ERROR", error);
      reject("Something wrong");
    }
  });
};
export const handleCheckoutSuccess = (data) => {
  const url = baseUrl + "/checkout/success";
  if (!data.metadata || !data.paymentIntentId) return;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response);
        resolve(response);
      } else {
        reject("Something wrong!");
      }
    } catch (error) {
      console.log("CHECKOUT_ERROR", error);
      reject("Something wrong");
    }
  });
};

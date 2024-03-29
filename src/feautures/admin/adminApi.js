import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const clodinarayPresetKey = import.meta.env.VITE_APP_CLOUDINARY_PRESET_KEY;

export async function fetchAdminProducts(email) {
  if (!email) return;
  return new Promise(async (resolve) => {
    try {
      const url = baseUrl + "/admin/products";
      const response = await axios.post(url, { email });

      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        // toast.error("Unauthorized !");
        return;
      }

      toast.error("Something wrong!");
    }
  });
}

export async function fetchPraductsByBrand(brand) {
  if (!brand) return;
  return new Promise(async (resolve) => {
    try {
      const url = baseUrl + "/admin/brand";
      const response = await axios.post(url, { brand });

      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      toast.error("Something wrong!");
    }
  });
}
export async function fetchPraductsByCategory(category) {
  if (!category) return;
  return new Promise(async (resolve) => {
    try {
      const url = baseUrl + "/admin/category";
      const response = await axios.post(url, { category });

      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      toast.error("Something wrong!");
    }
  });
}

export async function crateNewProduct(product) {
  const url = baseUrl + "/admin/products/create";
  if (!product) return toast.error("Something worng!, pls try again");

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(url, product);

      if (res.status === 200) {
        toast.success(res.data);
        resolve(res.data);
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      reject(error);
    }
  });
}
export async function updateProduct(product) {
  const url = baseUrl + "/admin/products/update";
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(url, product);

      if (res.status === 200) {
        toast.success(res.data);
        resolve(res.data);
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      reject(error);
    }
  });
}

export async function deleteProductById(id, navigate) {
  const url = baseUrl + "/admin/products";
  return new Promise(async () => {
    try {
      const res = await axios.delete(url, {
        data: { id },
      });

      if (res.status === 200) {
        toast.success(res.data);
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      navigate("/admin/products");
    }
  });
}

// Fetch Orders
export async function fetchOrdersByUserId(userId) {
  const url = baseUrl + "/admin/orders";
  if (!userId) return;

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(url, { userId });

      if (res.status === 200) {
        resolve(res.data.orders);
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      reject(error);
    }
  });
}

export async function updateOrder(status, orderId) {
  const url = baseUrl + "/admin/orders/update";
  if (!orderId || !status) return;

  try {
    const res = await axios.post(url, { status, orderId });

    if (res.status === 200) {
      toast.success(res.data);
    } else {
      toast.error("Something worng!, pls try again");
    }
  } catch (error) {
    toast.error("Something went wrong!");
    console.log(error);
  }
}

export async function upLoadImage(images, variationImages) {
  if (!images || images.length == 0) return;
  const formData = new FormData();

  const varImgs = variationImages?.filter((x) => x != "" && x);
  let limit = 3;

  if (varImgs) {
    limit -= varImgs.length;
  }

  formData.append("upload_preset", clodinarayPresetKey);

  let imageUrl = [];
  for (let i = 0; i < limit; i++) {
    if (!images[i]) break;
    formData.set("file", images[i]);

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dzpspuks7/image/upload",
      formData
    );

    if (res.status === 200) {
      imageUrl.push(res.data.secure_url);
    }
  }

  if (imageUrl.length == 0 && varImgs?.length === 0) {
    toast.error("Something wrong, pls try again");
    return null;
  }

  return varImgs ? [...varImgs, ...imageUrl] : imageUrl;
}

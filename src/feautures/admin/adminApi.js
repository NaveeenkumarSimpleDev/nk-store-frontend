import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const clodinarayPresetKey = import.meta.env.VITE_APP_CLOUDINARY_PRESET_KEY;

export async function fetchAdminProducts(email) {
  return new Promise(async (resolve) => {
    try {
      const url = baseUrl + "/admin/products";
      const response = await axios.post(url, { email });

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

  return new Promise(async (resolve) => {
    try {
      const res = await axios.post(url, product);

      if (res.status === 200) {
        resolve(res.data);
        toast.success("Created successfully");
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  });
}
export async function updateProduct(product) {
  const url = baseUrl + "/admin/products/update";
  return new Promise(async (resolve) => {
    try {
      const res = await axios.post(url, product);

      if (res.status === 200) {
        resolve(res.data);
        toast.success("Updated successfully");
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  });
}

export async function deleteProductById(id) {
  const url = baseUrl + "/admin/products";
  return new Promise(async () => {
    try {
      const res = await axios.delete(url, {
        data: { id },
      });

      if (res.status === 200) {
        toast.success("Product deleted successfully.");
      } else {
        toast.error("Something worng!, pls try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  });
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

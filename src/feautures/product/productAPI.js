import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export async function fetchProducts() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return new Promise(async (resolve) => {
    try {
      const url = baseUrl + "/products";
      const response = await axios.get(url, {
        params: urlSearchParams,
        headers: {
          "Content-Type": "application/json",
        },
      });
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

export async function fetchProductByFilter(data) {
  let querySting = "";
  if (data.priceRange[1] !== 0) {
    querySting += `price_renge=${data.priceRange[0]},${data.priceRange[1]}&`;
  }

  if (data.categories) {
    querySting += "cat=";
    for (let cat in data.categories) {
      querySting += `${cat},`;
    }
    querySting += "&";
  }

  if (data.brands) {
    querySting += "brands=";
    for (let brand in data.brands) {
      querySting += `${brand},`;
    }
  }

  const url = baseUrl + "/products/" + querySting;
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

export async function addToFavourites(data) {
  const url = baseUrl + "/favourites/addToFavourites";

  if (!data?.userId) return toast.error("Please login!.");

  return new Promise(async (resolve) => {
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
      console.log(error);
      toast.error("Error in favourites!");
    }
  });
}

export async function removeFavourites(data) {
  const url = baseUrl + "/favourites/removeFavourites";
  return new Promise(async (resolve) => {
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
      console.log(error);
      toast.error("Error in favourites!");
    }
  });
}

export async function fetchFavourites(userId) {
  const url = baseUrl + "/favourites";

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
    } catch (error) {
      console.log(error);
    }
  });
}

// product search
export async function searchProducts(query) {
  if (!query) return;
  const url = baseUrl + "/search";
  return new Promise(async (resolve) => {
    try {
      const response = await axios.post(
        url,
        { searchQuery: query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing wrong!");
    }
  });
}

export async function fetchBrands() {
  const url = baseUrl + "/products/brands";

  return new Promise(async (resolve) => {
    try {
      const res = await axios.get(url);

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

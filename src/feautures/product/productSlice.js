import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToFavourites,
  fetchBrands,
  fetchFavourites,
  fetchProductById,
  fetchProducts,
  removeFavourites,
} from "./productAPI";

const initialState = {
  status: "idle",
  products: [],
  selectedProduct: null,
  brands: [],
  favourites: null,
  error: null,
};

export const fetchProductsAsync = createAsyncThunk("products", async () => {
  const response = await fetchProducts();
  return response;
});
export const fetchBrandsAsync = createAsyncThunk("brands", async () => {
  const response = await fetchBrands();
  return response;
});

export const fetchProductByIdAsync = createAsyncThunk(
  "products/:product",
  async (productId) => {
    const response = await fetchProductById(productId);
    return response;
  }
);

export const addToFavouritesAsync = createAsyncThunk(
  "favourites/addToFavourites",
  async (data) => {
    const response = await addToFavourites(data);
    return response;
  }
);
export const removeFavouritesAsync = createAsyncThunk(
  "favourites/remove",
  async (data) => {
    const response = await removeFavourites(data);
    return response;
  }
);

export const fetchFavouritesAsync = createAsyncThunk(
  "favourites",
  async (userId) => {
    const response = await fetchFavourites(userId);
    return response;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.selectedProduct = null;
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state) => {
        state.status = "idle";
        state.error = "product fetch failed";
      })
      .addCase(fetchFavouritesAsync.fulfilled, (state, action) => {
        if (action.payload === "No Favourites") {
          state.favourites = null;
        } else {
          state.favourites = action.payload;
        }
      })
      .addCase(addToFavouritesAsync.fulfilled, (state, action) => {
        state.favourites = action.payload;
      })
      .addCase(removeFavouritesAsync.fulfilled, (state, action) => {
        state.favourites = action.payload;
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      });
  },
});

export default productSlice.reducer;

export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectFavourites = (state) => state.product.favourites;
export const selectBrands = (state) => state.product.brands;

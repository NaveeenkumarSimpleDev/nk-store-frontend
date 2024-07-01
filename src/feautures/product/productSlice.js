import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBrands,
  fetchFavourites,
  fetchProductById,
  fetchProducts,
} from "./productAPI";

const initialState = {
  status: "idle",
  products: null,
  totalProducts: null,
  selectedProduct: null,
  brands: [],
  favourites: null,
  error: null,
};

export const fetchProductsAsync = createAsyncThunk(
  "products",
  async (ITEMS_PER_PAGE) => {
    const response = await fetchProducts(ITEMS_PER_PAGE);
    return response;
  }
);
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
  reducers: {
    addToFavLocally: (state, action) => {
      if (!state.favourites) {
        state.favourites = [action.payload];
      } else {
        state.favourites.push(action.payload);
      }
    },
    removeFavLocally: (state, action) => {
      if (!state.favourites) return;
      const updateFav = state.favourites.filter((i) => i !== action.payload);
      state.favourites = updateFav;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.products = action.payload?.data;
        state.totalProducts = action.payload?.total;
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
        if (!action.payload) return;
        if (action.payload === "No Favourites") {
          state.favourites = [];
        } else if (action.payload?.length > 0) {
          state.favourites = action.payload;
        }
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      });
  },
});

export const { addToFavLocally, removeFavLocally } = productSlice.actions;

export default productSlice.reducer;

export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectFavourites = (state) => state.product.favourites;
export const selectBrands = (state) => state.product.brands;
export const selectTotalProducts = (state) => state.product.totalProducts;

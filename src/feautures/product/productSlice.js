import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from "./productAPI";
const initialState = {
  status: "idle",
  products: [],
  selectedProduct: null,
  error: null,
};

export const fetchProductsAsync = createAsyncThunk("products", async () => {
  const response = await fetchProducts();
  return response;
});

export const fetchProductByIdAsync = createAsyncThunk(
  "products/:product",
  async (productId) => {
    const response = await fetchProductById(productId);
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
      });
  },
});

export default productSlice.reducer;

export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;

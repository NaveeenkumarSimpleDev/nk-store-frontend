import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAdminProducts } from "./adminApi";

const initialState = {
  products: [],
};

export const fetchAdminProductsAsync = createAsyncThunk(
  "admin/products",
  async (email) => {
    const response = await fetchAdminProducts(email);

    return response;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default adminSlice.reducer;

export const selectAdminProducts = (state) => state.admin.products;

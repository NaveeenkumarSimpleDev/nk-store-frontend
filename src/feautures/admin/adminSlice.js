import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAdminProducts, fetchOrdersByUserId } from "./adminApi";

const initialState = {
  products: null,
  orders: null,
  selectedOrder: null,
};

export const fetchAdminProductsAsync = createAsyncThunk(
  "admin/products",
  async (email) => {
    const response = await fetchAdminProducts(email);

    return response;
  }
);
export const fetchAdminOrdersAsync = createAsyncThunk(
  "admin/orders",
  async (userId) => {
    const response = await fetchOrdersByUserId(userId);

    return response;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchAdminOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const { setSelectedOrder } = adminSlice.actions;

export default adminSlice.reducer;

export const selectAdminProducts = (state) => state.admin.products;
export const selectAdminOrders = (state) => state.admin.orders;
export const selectSelectedOrder = (state) => state.admin.selectedOrder;

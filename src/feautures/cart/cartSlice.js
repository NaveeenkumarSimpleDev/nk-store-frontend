import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchCartByUserId } from "./cartAPI";

const initialState = {
  status: "idle",
  cart: [],
};

export const fetchCartByUserIdAsync = createAsyncThunk(
  "cart",
  async (userId) => {
    const response = await fetchCartByUserId(userId);
    return response;
  }
);

export const addToCartAsync = createAsyncThunk(
  "cart/addTocart",
  async (data) => {
    const response = await addToCart(data);
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;

export const selectCartStatus = (state) => state.cart.status;
export const selectCart = (state) => state.cart.cart;
export const selectCartItems = (state) => state.cart.cart?.cartItems;

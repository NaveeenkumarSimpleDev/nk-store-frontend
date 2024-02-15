import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchCartByUserId, resetCart, updateCart } from "./cartAPI";

const initialState = {
  isOpen: false,
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

export const resetCartAsync = createAsyncThunk("cart/reset", async (data) => {
  const response = await resetCart(data);
  return response;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    updateCartLocally: (state, action) => {
      if (!state.cart?.cartItems) return;

      const findIndex = state.cart.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );
      if (action.payload.type === "delete") {
        state.cart.cartItems = state.cart.cartItems.splice(findIndex, 1);
      } else if (action.payload.type === "inc") {
        state.cart.cartItems[findIndex].quantity += 1;
      } else {
        state.cart.cartItems[findIndex].quantity -= 1;
      }
    },
  },
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
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export const { toggleCart, updateCartLocally } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartStatus = (state) => state.cart.status;
export const selectCartOpenStatus = (state) => state.cart.isOpen;
export const selectCart = (state) => state.cart.cart;
export const selectCartItems = (state) => state.cart.cart?.cartItems;

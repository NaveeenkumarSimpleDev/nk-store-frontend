import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feautures/auth/authSlice";
import productSlice from "./feautures/product/productSlice";
import cartSlice from "./feautures/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cart: cartSlice,
  },
});

export default store;

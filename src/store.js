import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feautures/auth/authSlice";
import productSlice from "./feautures/product/productSlice";
import cartSlice from "./feautures/cart/cartSlice";
import userSlice from "./feautures/user/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feautures/auth/authSlice";
import productSlice from "./feautures/product/productSlice";
import cartSlice from "./feautures/cart/cartSlice";
import userSlice from "./feautures/user/userSlice";
import adminSlice from "./feautures/admin/adminSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
    admin: adminSlice,
  },
});

export default store;

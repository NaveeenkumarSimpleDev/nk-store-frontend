import { addToCartAsync, selectCartItems } from "../feautures/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import { useContext, useState } from "react";
import { CartContext } from "../context/cart-context";

export const useCart = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const cartContext = useContext(CartContext);

  const addToCartHandler = async (product) => {
    if (!loggedInUser) {
      return navigate("/login");
    }
    const exsistingCartItem = cartItems?.find((item) => item.id === product.id);
    if (exsistingCartItem) {
      return;
    }

    await dispatch(
      addToCartAsync({
        userId: loggedInUser?.id,
        product,
      }),
    );
  };

  return {
    addToCart: addToCartHandler,
    cartItems,
    isCartOpen: cartContext?.state?.cartOpen,
    handleCartOpen: cartContext?.toggleCart,
  };
};

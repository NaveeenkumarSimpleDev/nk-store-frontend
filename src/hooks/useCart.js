import {
  addToCartAsync,
  selectCartItems,
  selectCartOpenStatus,
  toggleCart,
} from "../feautures/cart/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import { useCallback } from "react";

export const useCart = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectCartOpenStatus);
  const location = useLocation();

  const addToCartHandler = async (product) => {
    const url = location.pathname + location.search;
    if (!loggedInUser) {
      return navigate("/login", {
        state: { from: url },
      });
    }
    const exsistingCartItem = cartItems?.find((item) => item.id === product.id);
    if (exsistingCartItem) {
      return;
    }

    await dispatch(
      addToCartAsync({
        userId: loggedInUser?.id,
        variationId: product.variations.id,
        quantity: product.quantity,
      })
    );
  };

  const handleCartOpen = useCallback(() => {
    dispatch(toggleCart());
  }, []);

  return {
    addToCart: addToCartHandler,
    cartItems,
    isCartOpen,
    handleCartOpen,
  };
};

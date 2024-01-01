// CartContext.js
import { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  cartOpen: false,
};

// Action types
const actionTypes = {
  TOGGLE_CART: "TOGGLE_CART",
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_CART:
      return { cartOpen: !state.cartOpen };
    default:
      return state;
  }
};

// Create context
export const CartContext = createContext();

// Context provider component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const toggleCart = () => {
    dispatch({ type: actionTypes.TOGGLE_CART });
  };

  return (
    <CartContext.Provider value={{ state, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

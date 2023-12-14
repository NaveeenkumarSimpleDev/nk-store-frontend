import { addToCartAsync, selectCartItems } from "../feautures/cart/cartSlice";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import { useState } from "react";

export const useCart = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const loggedInUser = useSelector(selectLoggedInUser);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch()

    const handleCartOpen = () => setOpen(!open)

    const addToCartHandler = async (product) => {
        if (!loggedInUser) {
            return navigate("/login");
        }
        const exsistingCartItem = cartItems?.find((item) => item.id === product.id);
        if (exsistingCartItem) {
            return
        }

        await dispatch(
            addToCartAsync({
                userId: loggedInUser?.id,
                product
            })
        )
    }

    return {
        addToCart: addToCartHandler,
        cartItems,
        isCartOpen: open,
        handleCartOpen
    }

}

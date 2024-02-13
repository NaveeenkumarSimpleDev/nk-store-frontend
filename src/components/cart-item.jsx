import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash } from "lucide-react";

import Button from "./ui/button";
import { formatPrice } from "../lib/utils";
import { selectCart, updateCartAsync } from "../feautures/cart/cartSlice";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const CartItem = ({ item }) => {
  // const { quantity } = props.item;
  // const item = props.item[0];
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const cart = useSelector(selectCart);
  const { handleCartOpen } = useCart();

  const handleDelete = () => {
    const res = confirm("Are you sure to remove item from cart?");
    if (res) {
      dispatch(
        updateCartAsync({
          userId: loggedInUser?.id,
          variationId: item?.id,
          type: "delete",
        })
      );
    }
  };

  const handleQuantity = (opr) => {
    const type = opr === "inc" ? "inc" : "dec";

    if (type === "inc" && item.quantity === 10) {
      return toast.error("Max-quantity reached");
    }

    dispatch(
      updateCartAsync({
        userId: loggedInUser?.id,
        variationId: item?.id,
        type,
      })
    );
  };
  const total = Number(item?.price) * Number(item.quantity);

  // link for the product
  let linkTo = "/products/" + item?.product?.id + "?";
  const customAttributes = item?.customAttributes;

  if (customAttributes) {
    const customValues = Object.keys(customAttributes);
    customValues.forEach((key) => {
      linkTo += `${key}=${customAttributes[key]}&`;
    });
  }

  return (
    <>
      {cart?.cartItems && (
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex flex-row gap-2">
            <Link
              onClick={handleCartOpen}
              to={linkTo}
              className="border rounded-md h-12 w-20 sm:w-28 sm:h-20 "
            >
              <img
                src={item?.images[0]}
                className="object-contain h-full w-full object-center rounded-md"
                alt={item?.product?.title}
              />
            </Link>

            <div className="flex flex-col sm:-mt-1 overflow-hidden">
              <span className="overflow-ellipsis w-[5rem] md:w-[10rem] lg:w-[15rem] text-xs font-bold truncate  sm:text-lg sm:font-semibold">
                {item?.product?.title}
              </span>
              <span className="sm:text-base text-xs font-semibold">
                {formatPrice(item?.price)} X {item.quantity} ={" "}
                {formatPrice(total)}
              </span>
              <span className="text-xs sm:text-sm">
                {item?.product?.category}
              </span>
            </div>
          </div>

          <div className="shrink-0 ml-auto flex  gap-1">
            <div className="flex items-center gap-2 sm:gap-4 ">
              <Button
                disabled={item.quantity == "1"}
                onClick={() => handleQuantity("dec")}
                className=" p-1 sm:p-2 flex items-center justify-center"
              >
                <Minus size={14} />
              </Button>
              <span className=" text-sm sm:text-lg font-semibold">
                {item.quantity}
              </span>
              <Button
                onClick={() => handleQuantity("inc")}
                className="p-1 sm:p-2  flex items-center justify-center"
              >
                <Plus size={16} />
              </Button>
            </div>
            <Button onClick={handleDelete} className="p-1 sm:px-2 bg-red-500">
              <Trash size={12} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;

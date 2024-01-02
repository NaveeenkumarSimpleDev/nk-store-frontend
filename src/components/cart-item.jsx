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
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const cart = useSelector(selectCart);
  const currentItem = cart?.cartItems?.find((p) => p.id === item?.id);

  const { handleCartOpen } = useCart();

  const handleDelete = () => {
    const res = confirm("Are you sure to remove item from cart?");
    if (res) {
      dispatch(
        updateCartAsync({
          userId: loggedInUser?.id,
          productId: item?.id,
          type: "delete",
        }),
      );
    }
  };

  const handleQuantity = (opr) => {
    const type = opr === "inc" ? "inc" : "dec";

    if (type === "inc" && currentItem?.quantity === 10) {
      return toast.error("Max-quantity reached");
    }
    dispatch(
      updateCartAsync({ userId: loggedInUser?.id, productId: item?.id, type }),
    );
  };
  const total = Number(item?.discountPrice) * Number(currentItem?.quantity);
  // link for the product
  let linkTo = "/products/" + item?.id;
  const customAttributes = item?.variations?.customAttributes;
  console.log({ customAttributes });
  if (customAttributes) {
    const customValues = Object.keys(customAttributes);

    if (customValues[0]) {
      linkTo += `?${customValues[0]}=${encodeURIComponent(
        customAttributes[customValues[0]],
      )}`;
    }
    if (customValues[1]) {
      linkTo += `&${customValues[1]}=${encodeURIComponent(
        customAttributes[customValues[1]],
      )}`;
    }
    if (customValues[2]) {
      linkTo += `&${customValues[2]}=${encodeURIComponent(
        customAttributes[customValues[2]],
      )}`;
    }
  }
  return (
    <>
      {cart?.cartItems && (
        <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-row gap-2">
            <Link onClick={handleCartOpen} to={linkTo}>
              <img
                src={item?.variations?.images[0]}
                className="h-12 w-20 sm:w-28 sm:h-20 object-cover object-center rounded-md"
                alt={item?.title}
              />
            </Link>

            <div className="flex flex-col sm:-mt-1 overflow-hidden">
              <span className="overflow-ellipsis text-xs font-bold truncate sm:text-lg sm:font-semibold">
                {item?.title}
              </span>
              <span className=" text-xs sm:text-base font-semibold">
                {formatPrice(item?.discountPrice)} X{" "}
                {formatPrice(currentItem?.quantity)} = {formatPrice(total)}
              </span>
              <span className="text-xs sm:text-sm">{item?.category}</span>
            </div>
          </div>

          <div className="flex gap-1">
            <div className="flex items-center gap-2 sm:gap-4 ">
              <Button
                disabled={currentItem?.quantity == "1"}
                onClick={() => handleQuantity("dec")}
                className=" p-1 sm:p-2 flex items-center justify-center"
              >
                <Minus size={14} />
              </Button>
              <span className=" text-sm sm:text-lg font-semibold">
                {currentItem?.quantity}
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

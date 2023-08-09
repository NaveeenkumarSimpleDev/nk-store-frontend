import { X } from "lucide-react";

import CartItem from "../components/cart-item";
import Button from "../components/ui/button";
import { cn, formatPrice } from "../lib/utils";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../feautures/cart/cartSlice";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../feautures/auth/authSlice";

const Cart = ({ isOpen, setIsOpen }) => {
  const cart = useSelector(selectCart);
  const loggedInUser = useSelector(selectLoggedInUser);

  const cartItemsWithQuantity = cart?.cartItems?.map((item) => ({
    id: item?.id,
    price: item?.discountPrice,
    quantity: item?.quantity,
    total: Number(item?.discountPrice) * Number(item?.quantity),
  }));

  const subTotal = cartItemsWithQuantity?.reduce(
    (prev, curr) => prev + curr.total,
    0
  );
  const delivary = 0;
  const total = subTotal + delivary;

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className={cn(
            " z-[100] fixed top-0 min-h-screen min-w-full bg-[rgba(0,0,0,0.1)]"
          )}
        />
      )}

      <div
        className={cn(
          "transition-all duration-200 z-[110] h-screen  w-full flex flex-col gap-4 max-w-[35rem] fixed right-0 bg-white",
          isOpen ? "clip-inset-100" : "-clip-inset-0"
        )}
      >
        <div>
          <div
            onClick={onClose}
            className="hover:bg-accent absolute w-fit p-2 cursor-pointer rounded-full"
          >
            <X strokeWidth={3} size={22} />
          </div>
          <div className="text-2xl font-bold w-fit mx-auto mt-4">
            Cart ({cart?.cartItems?.length || 0})
          </div>
          <hr className="my-6 mx-4" />
        </div>
        {/* content */}
        {!loggedInUser && (
          <div className="h-full w-ful flex justify-center">
            <div className="flex items-center gap-3 flex-col">
              <p>Login to manage products in cart</p>
              <Link to="/login">
                <div className="border py-1.5 px-2.5 bg-black text-white  hover:bg-white hover:text-black rounded-md transition flex  items-center">
                  <span className=" font-semibold text-md ">LOGIN</span>
                </div>
              </Link>
            </div>
          </div>
        )}
        {cart.cartItems?.length !== 0 ? (
          <div className="h-full flex flex-col">
            <div className=" flex-grow overflow-y-auto">
              <div className="px-4 flex flex-col gap-3">
                {cart?.cartItems?.map((item, idx) => (
                  <div key={item?.id}>
                    <CartItem item={item} />
                    <hr className="mt-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* total,other payments */}
            <div className="px-4 pb-[9rem]  mt-auto flex-shrink-0 h-auto flex flex-col bg-white py-4 justify-end w-full">
              <div>
                <hr className="my-2 sm:my-4" />
                <div className="flex items-center justify-between">
                  <span className="font-semibold sm:text-base text-sm">
                    Sub total
                  </span>
                  <span className="font-semibold sm:text-base text-sm">
                    {formatPrice(subTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold sm:text-base text-sm">
                    Delivary fee
                  </span>
                  <span className="font-semibold sm:text-base text-sm">
                    + {formatPrice(delivary)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold sm:text-base text-sm">
                    Tax
                  </span>
                  <span className="font-semibold sm:text-base text-sm">
                    {formatPrice(0)}
                  </span>
                </div>
                <hr className=" my-2 sm:my-4" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">total</span>
                  <span className="font-bold">{formatPrice(total)}</span>
                </div>
              </div>
              <Button className="w-full mt-2 text-sm sm:py-2 py-1 sm:text-base sm:mt-4 font-semibold">
                Check out
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full w-ful flex justify-center">
            <div className="flex items-center gap-3 flex-col">
              <h1>Your cart is empty!</h1>
              <Link onClick={() => setIsOpen(false)} to="/products">
                <Button>Shop now.</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

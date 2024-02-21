import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync, selectCart } from "../feautures/cart/cartSlice";
import { Link } from "react-router-dom";
import Button from "./ui/button";

const SuccessPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  useEffect(() => {
    dispatch(resetCartAsync(cart?.id));
  }, [cart?.id]);

  return (
    <div className="flex items-center flex-col justify-center p-4 bg-green-400 rounded-md w-fit mx-5">
      <div className="bg-green-400 rounded-md px-6 py-4 mt-4">
        <h1 className="font-bold text-lg sm:text-xl text-black">
          Payment Success ✔
        </h1>
        <p className="font-semibold">
          Congratulations you are purchased new products, the Orders will
          reflected in your orders soon.
        </p>
      </div>
      <div className="my-4 mr-auto">
        <Link to="/" className="font-semibold px-4 ">
          <Button className="bg-white text-black">Home</Button>
        </Link>
        <Link to="/orders" className="font-semibold px-4">
          <Button className="bg-white text-black max-sm:mt-3">My Orders</Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;

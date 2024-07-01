import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync, selectCart } from "../feautures/cart/cartSlice";
import { Link } from "react-router-dom";
import Button from "./ui/button";

const SuccessPage = () => {
  return (
    <div className="flex items-center flex-col justify-center p-4 bg-white rounded-md">
      <div className=" rounded-md px-6 py-4 ">
        <h1 className="font-bold text-lg sm:text-xl text-green-800">
          Payment Success ✔
        </h1>
        <p className="font-semibold">
          Congratulations you are purchased new products, the Orders will
          reflected in your orders soon.
        </p>
      </div>
      <div className="my-4 px-4 space-x-2 mr-auto">
        <Link
          replace={true}
          to="/"
          className="font-semibold px-4  bg-black text-white py-2 rounded-sm hover:opacity-95"
        >
          Home
        </Link>

        <Link
          to="/orders"
          replace={true}
          className="max-sm:mt-3 font-semibold px-4  bg-black text-white py-2 rounded-sm hover:opacity-95 "
        >
          My Orders
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;

import React from "react";
import { useCart } from "../hooks/useCart";
import Heading from "./ui/heading";
import { loadStripe } from "@stripe/stripe-js";

loadStripe(import.meta.env.VITE_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const OrderSummary = () => {
  const { cartItems } = useCart();

  return (
    <div className="space-y-3">
      <Heading title="Order Summary" />
      {cartItems?.map((p) => {
        const customAttributes = Object.keys(p.customAttributes || {});
        return (
          <div className="grid grid-cols-8 gap-3 max-sm:h-[7rem] h-[10rem] border rounded-md  overflow-hidden">
            <div className=" flex col-span-3 md:col-span-2  border-r">
              <img
                className="object-cover  object-center "
                src={p?.images[0]}
              />
            </div>
            <div className="md:col-span-6 col-span-5 overflow-hidden">
              <h2 className="font-semibold md:text-xl sm:lg truncate">
                {p.product.title}
              </h2>
              <p className="break-words overflow-ellipsis max-sm:text-xs  max-h-[1lh] text-sm truncate text-gray-400">
                {p.product.description}
              </p>
              <div className="font-bold max-sm:text-xs h-full">
                {customAttributes.map((att) => (
                  <p className="">
                    <span className="capitalize mr-2"> {att}:</span>
                    {p.customAttributes[att]}
                  </p>
                ))}
                <p className="max-sm:text-xs  lg:text-lg text-gray-400 mt-auto">
                  Quantity: {p.quantity}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSummary;

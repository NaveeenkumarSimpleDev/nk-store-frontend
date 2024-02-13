import React from "react";
import { useCart } from "../hooks/useCart";
import Heading from "./ui/heading";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(
  import.meta.env.VITE_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const OrderSummary = () => {
  const { cartItems } = useCart();

  return (
    <div className="space-y-3">
      <Heading title="Order Summary" />
      {cartItems?.map((p) => {
        const customAttributes = Object.keys(p.customAttributes || {});
        return (
          <div className="grid grid-cols-8 gap-3 h-[10rem] border rounded-md  overflow-hidden">
            <div className=" flex col-span-2 border-r">
              <img className="object-cover object-center " src={p?.images[0]} />
            </div>
            <div className="col-span-6 overflow-hidden">
              <h2 className="font-semibold text-xl">{p.product.title}</h2>
              <p className="break-words overflow-ellipsis  max-h-[1lh] text-sm truncate text-gray-400">
                {p.product.description}
              </p>
              <div className="font-bold">
                {customAttributes.map((att) => (
                  <p className="">
                    <span className="capitalize mr-2"> {att}:</span>
                    {p.customAttributes[att]}
                  </p>
                ))}
                <p className="text-xl text-gray-400">Quantity: {p.quantity}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSummary;

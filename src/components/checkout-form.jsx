import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  handleCheckout,
  handleCheckoutSuccess,
} from "../feautures/cart/cartAPI";
import { useCart } from "../hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync, selectCart } from "../feautures/cart/cartSlice";
import LoadingIndigator from "./loading-indicator";
import Button from "./ui/button";
import Model from "./model";

const CheckoutForm = ({ selectedAddress, user, setSuccess }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart();
  const cartId = useSelector(selectCart)?.id;
  const [clientSecret, setClientSecret] = useState("");
  const [orederItems, setOrderItems] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleCheckout({
      cartItems,
      userId: user?.id,
      address: selectedAddress,
    }).then((data) => {
      setClientSecret(data?.clientSecret);
      setOrderItems(data?.metadata);
    });
  }, []);

  const handleSuccess = async (paymentIntentId, orederItems) => {
    if (!paymentIntentId || !orederItems) return;
    await handleCheckoutSuccess({ paymentIntentId, metadata: orederItems });
    await dispatch(resetCartAsync(cartId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    setLoading(false);
    if (error) {
      console.error(error);
    } else {
      setSuccess(true);
      await handleSuccess(paymentIntent.id, orederItems);
    }
  };
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "10px",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <>
      {loading && (
        <Model className="bg-white rounded-md animate-[animateToTop] transition duration-300">
          <div className=" px-6 py-10 space-y-2">
            <LoadingIndigator className="flex  justify-center" />
            <p className="font-semibold text-xl ">Payment Processing</p>
            <span className="text-sm text-neutral-500">
              Don't press back or close the window!.
            </span>
          </div>
        </Model>
      )}
      <form onSubmit={handleSubmit}>
        <div className="checkout-form p-4 border rounded">
          <CardElement
            options={CARD_ELEMENT_OPTIONS}
            className="card-element"
          />
        </div>
        <Button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="disabled:bg-red-500 px-6 mt-6 rounded-md bg-blue-600 hover:opacity-70 font-semibold  "
        >
          Pay
        </Button>
      </form>
    </>
  );
};

export default CheckoutForm;

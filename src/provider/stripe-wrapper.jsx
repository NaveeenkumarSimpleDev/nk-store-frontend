import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripeWrapper = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeWrapper;

import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import Button from "../components/ui/button";
import useCheckout, { checkOutHandler } from "../hooks/useCheckout";
import AddressPage from "../components/address-page";
import OrderSummary from "../components/order-summary";
import Loading from "../components/loading-indicator";
import { useNavigate } from "react-router-dom";
import LoadingIndigator from "../components/loading-indicator";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import { selectAddress } from "../feautures/orders/orderSlice";

const CheckOutPage = () => {
  const { cartItems } = useCart();
  const selectedAddress = useSelector(selectAddress);

  const { currentPage, handleNext, handlePrev } = useCheckout();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);
  if (!cartItems)
    return (
      <LoadingIndigator className=" h-screen w-full flex items-center justify-center" />
    );
  return (
    <div className="grid lg:grid-cols-3">
      <div className="col-span-2 space-y-2  rounded-md border p-2">
        {/* <div className="flex gap-2">
          <span
            className={cn(
              "text-sm font-light",
              currentPage == 1 && "font-bold"
            )}
          >
            Delivary Address
          </span>
          <span
            className={cn(
              "text-sm font-light",
              currentPage == 2 && "font-bold"
            )}
          >
            Order Summary
          </span>
          <span
            className={cn(
              "text-sm font-light",
              currentPage == 3 && "font-bold"
            )}
          >
            Payment
          </span>
        </div> */}
        {currentPage === 1 && <AddressPage />}
        {currentPage === 2 && <OrderSummary />}
        <div className="space-x-3">
          <Button
            className="px-4 font-semibold bg-transparent text-black border"
            onClick={() =>
              currentPage === 1
                ? window.confirm("Are you sure want to leave?") == true &&
                  navigate("/")
                : handlePrev()
            }
          >
            {currentPage === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            disabled={!selectedAddress}
            onClick={async () =>
              currentPage === 2
                ? checkOutHandler(cartItems, user?.id, selectedAddress)
                : handleNext()
            }
            className="p-2 font-bold"
          >
            Continue
          </Button>
        </div>
      </div>
      <div className="max-lg:hidden border flex flex-col rounded-md mx-2 px-4 py-2 h-full w-full pb-3">
        <p className="text-xl font-bold text-gray-400 border-b my-2">
          Price Details
        </p>
        <div>
          <div className="flex justify-between px-2 text-lg font-semibold  my-3">
            <p>Price ({cartItems?.length} items)</p>
            <p>{cartItems?.map((p) => p.price).reduce((a, b) => a + b)}</p>
          </div>
          <div className="flex justify-between px-2 text-lg font-semibold my-3 ">
            <p>Delivary chargers</p>
            <p>+0</p>
          </div>
          <div className="flex justify-between px-2 text-lg font-semibold my-3 ">
            <p>GST</p>
            <p>+0</p>
          </div>
        </div>
        <div className="flex justify-between px-2 font-bold text-xl mt-auto border-y py-4 border-dotted">
          <p>Total Amount</p>
          <p>{cartItems?.map((p) => p.price).reduce((a, b) => a + b)}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;

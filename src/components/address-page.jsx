import React, { useEffect, useState } from "react";
import useCheckout from "../hooks/useCheckout";
import AddressCard from "./address-card";
import Button from "./ui/button";
import AddressForm from "./address-form";
import Heading from "./ui/heading";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressByUserIdAsync,
  selectAddresses,
} from "../feautures/orders/orderSlice";
import Model from "./model";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import LoadingIndigator from "./loading-indicator";

const AddressPage = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const addresses = useSelector(selectAddresses);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(fetchAddressByUserIdAsync(user?.id));
  }, [user?.id]);

  if (!addresses) {
    return (
      <LoadingIndigator className="w-full flex items-center justify-center mx-auto p-4" />
    );
  }

  return (
    <div className="">
      <div className="space-y-3 mb-3">
        <Heading title="Address" />
        <form className="space-y-2">
          {addresses?.map((add, idx) => (
            <AddressCard address={add} key={idx} />
          ))}
          {addresses?.length == 0 && (
            <p className="text-lg font-semibold">Create Address</p>
          )}
        </form>
        {!isOpen && (
          <Button
            className="px-3 py-1 font-semibold"
            onClick={() => setIsOpen(true)}
          >
            New Address
          </Button>
        )}
      </div>

      {isOpen && (
        <Model
          className="z-[151] md:h-fit w-fit m-auto fixed max-md:h-full max-md:w-full overflow-auto flex md:items-center md:justify-center "
          backType="function"
          backButtonHref={setIsOpen}
        >
          <AddressForm onClose={setIsOpen} />
        </Model>
      )}
    </div>
  );
};

export default React.memo(AddressPage);

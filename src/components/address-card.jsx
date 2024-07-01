import React, { useState } from "react";
import useCheckout from "../hooks/useCheckout";
import { Edit, Trash } from "lucide-react";
import AddressForm from "./address-form";
import Model from "./model";
import { deleteAddress } from "../feautures/orders/orderAPI";
import { useDispatch } from "react-redux";

const AddressCard = ({ address }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { setAddress, selectedAddress } = useCheckout();

  const formatedAddress = `${address.area}, ${address.locality}, ${address.city}, ${address.state}, ${address.pincode}
    ${address.landmark}
  `;

  return (
    <>
      <div
        className="flex gap-6 border rounded-md px-4 items-center"
        onClick={() => setAddress(address.id)}
      >
        <input
          className="h-4 w-4"
          name="address"
          checked={selectedAddress === address.id}
          onChange={() => setAddress(address.id)}
          id={address.id}
          type="radio"
        />
        <label htmlFor={address.id} className="py-3">
          <p className="font-bold mr-2 md:text-lg">
            {address.name}{" "}
            <span className="font-normal text-gray-400 text-xs md:text-sm">
              ({address.mobile})
            </span>
          </p>
          <p className="max-md:text-sm">{formatedAddress}</p>
        </label>

        <div className="ml-auto space-y-3">
          <Trash
            className="h-4 cursor-pointer hover:scale-125 transition-all"
            onClick={async () => {
              const confirm = window.confirm(
                "Are you sure delete the Address?"
              );
              if (confirm) {
                await deleteAddress(address, dispatch);
              }
            }}
          />
          <Edit
            className="h-4 cursor-pointer hover:scale-125 transition-all"
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
      </div>
      {open && (
        <Model backType="function" backButtonHref={setOpen}>
          <AddressForm onClose={setOpen} address={address} type="edit" />
        </Model>
      )}
    </>
  );
};

export default AddressCard;

import React from "react";
import useCheckout from "../hooks/useCheckout";

const AddressCard = ({ address, idx }) => {
  const { selectedAddress, setSelectedAddress } = useCheckout();
  return (
    <div className="flex gap-6 border rounded-md px-4 items-center">
      <input
        className="h-4 w-4"
        name="address"
        checked={selectedAddress === idx}
        id={idx}
        type="radio"
        onChange={() => {
          setSelectedAddress(idx);
        }}
      />
      <label htmlFor={idx} className="py-3">
        <p className="font-bold mr-2 text-lg">
          {address.name}{" "}
          <span className="font-normal text-gray-400 text-sm">
            ({address.mobile})
          </span>
        </p>
        <p>{address.address}</p>
      </label>
    </div>
  );
};

export default AddressCard;

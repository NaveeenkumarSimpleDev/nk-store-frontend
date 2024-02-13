import React, { useState } from "react";
import useCheckout from "../hooks/useCheckout";
import AddressCard from "./address-card";
import Button from "./ui/button";
import AddressForm from "./address-form";
import Heading from "./ui/heading";

const address = [
  {
    name: "Naveenkumar",
    address:
      "97/54, Gowri illam , Adiyaman Street, Verrappan Chatiram, Erode - 638004, Tamil Nadu",
    mobile: "8098238520",
  },
  {
    name: "Naveenkumar",
    address:
      "97/54, Gowri illam , Adiyaman Street, Verrappan Chatiram, Erode - 638004, Tamil Nadu",
    mobile: "8098238520",
  },
];
const AddressPage = () => {
  const [isNewAddress, setNewAddress] = useState(false);
  const { setSelectedAddress } = useCheckout();
  return (
    <div className="">
      <div className="space-y-3 mb-3">
        <Heading title="Address" />
        <div className="space-y-2">
          {address.map((add, idx) => (
            <AddressCard
              address={add}
              idx={idx}
              key={idx}
              setSelectedAddress={setSelectedAddress}
            />
          ))}
        </div>
        {!isNewAddress && (
          <Button
            className="px-3 py-1 font-semibold"
            onClick={() => setNewAddress(true)}
          >
            New Address
          </Button>
        )}
      </div>

      {isNewAddress && <AddressForm onClose={setNewAddress} />}
    </div>
  );
};

export default AddressPage;

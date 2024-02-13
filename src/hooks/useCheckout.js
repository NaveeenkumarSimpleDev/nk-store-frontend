import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const useCheckout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(0);

  const handleNext = () => {
    if (currentPage !== 3) {
      setCurrentPage((prev) => prev + 1);
      return;
    }
  };
  const handlePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
      return;
    }
  };
  return {
    setCurrentPage,
    currentPage,
    handleNext,
    handlePrev,
    selectedAddress,
    setSelectedAddress,
  };
};

export default useCheckout;

export const checkOutHandler = async (items, userId) => {
  if (!items || !userId) return;
  const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const formatedItems = items?.map((item) => ({
    variationId: item.id,
    quantity: item.quantity,
  }));
  toast.loading("Redirecting payment..", {
    position: "top-center",
    id: "loading",
  });
  try {
    const response = await axios.post(baseUrl + "/checkout", {
      items: formatedItems,
      userId,
    });
    if (response.status === 200) {
      window.location.href = response.data;
    }
  } catch (error) {
    console.log("CHECKOUT", error);
    toast.dismiss("loading");
  }
};

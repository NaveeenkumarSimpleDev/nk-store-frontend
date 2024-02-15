import axios from "axios";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAddress,
  setSelectedAddress,
} from "../feautures/orders/orderSlice";

const useCheckout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const selectedAddress = useSelector(selectAddress);
  const dispatch = useDispatch();
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

  const setAddress = (add) => {
    dispatch(setSelectedAddress(add));
  };

  return {
    setCurrentPage,
    currentPage,
    handleNext,
    handlePrev,
    selectedAddress,
    setAddress,
  };
};

export default useCheckout;

export const checkOutHandler = async (items, userId, selectedAddress) => {
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
      selectedAddress,
    });
    if (response.status === 200) {
      window.location.href = response.data;
    }
  } catch (error) {
    console.log("CHECKOUT", error);
    toast.dismiss("loading");
  }
};

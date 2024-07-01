import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../feautures/user/userSlice";
import {
  fetchFavouritesAsync,
  selectFavourites,
} from "../feautures/product/productSlice";
import { fetchAllProducts } from "../feautures/product/productAPI";

export const useFavourites = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const favourites = useSelector(selectFavourites);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetchAllProducts();

    if (res?.data) {
      setProducts(res.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    try {
      fetchProducts();
      dispatch(fetchFavouritesAsync(user?.id));
    } catch (error) {
      console.log("FAV", error);
    }
  }, []);

  const favProducts = products?.filter((p) => {
    if (favourites?.includes(p.id)) {
      return p;
    }
  });

  return {
    favProducts,
    loading,
  };
};

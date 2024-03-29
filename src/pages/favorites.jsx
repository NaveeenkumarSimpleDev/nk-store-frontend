import React, { useEffect } from "react";
import Heading from "../components/ui/heading";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavouritesAsync,
  fetchProductsAsync,
  selectAllProducts,
  selectFavourites,
} from "../feautures/product/productSlice";
import ProductCard from "../components/ui/product-card";
import { selectUser } from "../feautures/user/userSlice";
import ProductLoading from "../components/product-loading";

const Favorites = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const products = useSelector(selectAllProducts);
  const favourites = useSelector(selectFavourites);

  useEffect(() => {
    try {
      dispatch(fetchProductsAsync());
      dispatch(fetchFavouritesAsync(user?.id));
    } catch (error) {
      console.log("FAV", error);
    }
  }, []);

  const favProducts = products?.map((p) => {
    if (favourites?.includes(p.id)) {
      return p;
    }
  });

  const fav = favProducts?.filter((item) => item !== undefined);
  console.log({ favProducts });

  return (
    <div className="mt-4 flex flex-col gap-6">
      <Heading
        title="Favourites"
        desc="Your personalized collection of favourite items."
      />
      {!fav && <ProductLoading />}
      {fav?.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {fav?.map((product) => (
            <ProductCard product={product} favourite={true} key={product?.id} />
          ))}
        </div>
      ) : fav?.length === 0 ? (
        <p className="font-semibold text-lg text-gray-400">
          No Favourites found!
        </p>
      ) : (
        <ProductLoading />
      )}
    </div>
  );
};

export default React.memo(Favorites);

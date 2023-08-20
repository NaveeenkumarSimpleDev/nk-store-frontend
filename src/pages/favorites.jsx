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

const Favorites = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const products = useSelector(selectAllProducts);
  const favourites = useSelector(selectFavourites)?.favourites;

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchFavouritesAsync(user?.id));
  }, []);

  const favProducts = products?.map((p) => {
    if (favourites?.includes(p.id)) {
      return p;
    }
  });

  const fav = favProducts?.filter((item) => item !== undefined);

  return (
    <div className="mt-4 flex flex-col gap-6">
      <Heading title="Favourites" />
      {fav && fav?.length !== 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {fav?.map((product) => (
            <ProductCard product={product} favourite={true} key={product?.id} />
          ))}
        </div>
      ) : (
        <p className="pl-3">No Favourites</p>
      )}
    </div>
  );
};

export default React.memo(Favorites);

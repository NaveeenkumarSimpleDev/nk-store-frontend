import React, { useEffect } from "react";
import Heading from "../components/ui/heading";
import ProductCard from "../components/ui/product-card";
import ProductLoading from "../components/product-loading";
import { useFavourites } from "../hooks/useFavourites";

const Favorites = () => {
  const { favProducts, loading } = useFavourites();

  return (
    <div className="mt-4 flex flex-col gap-6">
      <Heading
        title="Favourites"
        desc="Your personalized collection of favourite items."
      />
      {favProducts?.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {favProducts?.map((product) => (
            <ProductCard product={product} favourite={true} key={product?.id} />
          ))}
        </div>
      ) : favProducts?.length === 0 && !loading ? (
        <p className="font-semibold text-lg text-gray-400">
          No Favourites found!
        </p>
      ) : (
        <ProductLoading />
      )}
    </div>
  );
};

export default Favorites;

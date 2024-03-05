import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Heading from "../components/ui/heading";
import Button from "../components/ui/button";
import ProductCard from "../components/ui/product-card";
import ProductLoading from "../components/product-loading";
import Filters from "../components/filters";
import {
  fetchBrandsAsync,
  fetchProductsAsync,
  selectAllProducts,
} from "../feautures/product/productSlice";
import SortSelectionButton from "../components/sortSelectionButton";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [filter, setFiler] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!products) {
      setLoading(true);
      await dispatch(fetchProductsAsync());
      setLoading(false);
    } else {
      await dispatch(fetchProductsAsync());
    }

    dispatch(fetchBrandsAsync());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (sortBy.trim().length === 0) {
      urlSearchParams.delete("sort");
    } else {
      urlSearchParams.set("sort", sortBy);
    }

    const newUrl = `${window?.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);

    dispatch(fetchProductsAsync());
  }, [sortBy]);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
  }, []);

  let content;

  if (products && products?.length > 0) {
    content = (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } else if (!loading && products?.length === 0) {
    content = <p>No products found</p>;
  } else {
    content = <ProductLoading />;
  }

  console.log({ products });
  return (
    <>
      <div className="py-8">
        <Heading title="Products" desc="Buy all products from our store" />

        <div className="mt-7 flex gap-4 items-center">
          {/* filter trigger */}
          <Button
            onClick={() => setFiler(true)}
            className=" py-2 text-sm sm:text-md font-semibold"
          >
            Filter
          </Button>

          {/* sort filter */}
          <SortSelectionButton onChange={handleSortChange} />
        </div>
        {/* content */}
        <section className="mt-6">{content}</section>
      </div>

      <div>
        <Filters isOpen={filter} setIsOpen={setFiler} />
      </div>
    </>
  );
};
export default React.memo(ProductPage);

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
  selectTotalProducts,
} from "../feautures/product/productSlice";
import SortSelectionButton from "../components/sortSelectionButton";
import Pagination from "../components/pagination";
import { LucideRotateCw } from "lucide-react";
import useWindowWidth from "../hooks/useWindowWidth";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const totalProducts = useSelector(selectTotalProducts);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [filter, setFiler] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const windowWidth = useWindowWidth();

  const [ITEMS_PER_PAGE, setItemsPerPage] = useState(() => {
    return windowWidth < 1024
      ? 10
      : windowWidth > 1024 && windowWidth < 1280
      ? 9
      : windowWidth > 1280 && windowWidth < 1540
      ? 8
      : 10;
  });

  const fetchProducts = async () => {
    await dispatch(fetchProductsAsync(ITEMS_PER_PAGE));

    dispatch(fetchBrandsAsync());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProductsWithLoading = async () => {
    setLoading(true);
    await dispatch(fetchProductsAsync(ITEMS_PER_PAGE));
    setLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(() => {});
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (sortBy.trim().length === 0) {
      urlSearchParams.delete("sort");
    } else {
      urlSearchParams.delete("page");
      urlSearchParams.set("sort", sortBy);
    }

    if (page) {
      urlSearchParams.set("page", page);
    }

    const newUrl = `${window?.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);

    fetchProductsWithLoading();
  }, [sortBy, page]);

  // handle sort
  const handleSortChange = useCallback((value) => {
    if (page != 1) setPage(1);
    setSortBy(value);
  }, []);

  // handlepage
  const handlePage = (p) => {
    if (page === p) return;
    setPage(p);
  };

  console.log({ products });
  let content;

  if (products && products?.length > 0) {
    content = (
      <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products?.map((product, idx) => (
            <ProductCard key={product.id + idx} product={product} />
          ))}
        </div>

        <Pagination
          page={page}
          handlePage={handlePage}
          totalItems={totalProducts}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        />
      </>
    );
  } else if (products?.length === 0) {
    content = <p>No products found</p>;
  } else {
    content = <ProductLoading />;
  }

  return (
    <>
      {loading && (
        <div className="fixed z-[200] top-0 left-0 h-full flex justify-center items-center w-full bg-black/50">
          <LucideRotateCw className="animate-spin text-white/90 z-[201] h-8 w-8" />
        </div>
      )}
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
        <section className="mt-6">
          {content}
          {/* {totalProducts > ITEMS_PER_PAGE && ( */}

          {/* )} */}
        </section>
      </div>

      <div>
        <Filters isOpen={filter} setIsOpen={setFiler} />
      </div>
    </>
  );
};
export default ProductPage;

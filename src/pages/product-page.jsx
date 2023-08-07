import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "../components/ui/select";
import Heading from "../components/ui/heading";
import Button from "../components/ui/button";
import ProductCard from "../components/ui/product-card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAsync,
  selectAllProducts,
} from "../feautures/product/productSlice";
import { useCallback, useEffect, useState } from "react";
import ProductLoading from "../components/product-loading";
import Filters from "../components/filters";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [filter, setFiler] = useState(false);
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, []);

  const handleSortChange = useCallback((value) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("sort", value);

    const newUrl = `${window?.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }, []);

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
          <div className="flex flex-col gap-2">
            <Select
              onValueChange={(e) => {
                handleSortChange(e);
              }}
            >
              <SelectTrigger className="w-fit font-semibold flex gap-4 text-sm sm:text-md bg-black  text-white rounded-md hover:opacity-90">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="px-4">
                <SelectGroup>
                  <SelectLabel className="font-bold text-sm sm:text-md">
                    Sort by
                  </SelectLabel>
                  <SelectSeparator />
                  <SelectItem
                    value="Newest"
                    className="text-xs sm:text-sm  cursor-pointer font-semibold"
                  >
                    Newest on top
                  </SelectItem>
                  <SelectItem
                    value="priceLowToHigh"
                    className="text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    Price: Low to high
                  </SelectItem>
                  <SelectItem
                    value="priceHighToLow"
                    className="text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    Price: High to low
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <section className="mt-6">
          {products.length === 0 ? (
            <ProductLoading />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {products?.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          )}
        </section>
      </div>

      <div>
        <Filters isOpen={filter} setIsOpen={setFiler} />
      </div>
    </>
  );
};
export default ProductPage;

import axios from "axios";
import { SearchIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../feautures/product/productSlice";

const SearchPage = ({ setOpen }) => {
  const products = useSelector(selectAllProducts);
  const [searchResults, setSearchResults] = useState([]);
  let timeout;

  const searchProducts = useCallback((query) => {
    return products?.filter((product) => {
      if (product.title.toLowerCase().includes(query.toLowerCase())) {
        return product;
      }
    });
  }, []);

  const onValueChange = useCallback((e) => {
    const query = e?.target.value;
    if (query.length === 0) return;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const results = searchProducts(query);
      setSearchResults(results);
    }, 1000);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className="min-h-screen z-10 min-w-[100vw] absolute top-0 left-0 bg-[rgba(0,0,0,0.9)]"
      />
      <section className="z-20 absolute top-0 mt-20 left-0 flex items-center justify-center h-full w-full">
        <div className="flex gap-4 transition delay-100 ease-in-out  hover:bg-accent items-center bg-white rounded-md xl:py-1.5 py-2 px-3 cursor-pointer border border-gray-100 shadow-sm">
          <SearchIcon size={20} />
          <input
            className="disabled:cursor-pointer placeholder:text-sm  xl:block bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 w-full"
            type="text"
            placeholder="Search here.."
            onChange={onValueChange}
          />
        </div>
      </section>
    </>
  );
};

export default SearchPage;

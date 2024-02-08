import { SearchIcon, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchProducts } from "../feautures/product/productAPI";
import Button from "../components/ui/button";

const SearchPage = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const inputRef = useRef();
  let timeout;

  useEffect(() => {
    // inputRef.focus();
  }, []);

  const onClose = () => setOpen(false);

  const onValueChange = useCallback(async (e) => {
    setLoading(true);
    const query = e.target.value;
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      searchProducts(query)
        .then((data) => {
          setResults(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, []);

  let content;

  if (loading) {
    content = <p className="w-full mx-auto flex p-3">Searching....</p>;
  }

  if (results && !loading) {
    content = (
      <div className="p-4">
        {results?.brands?.length > 0 && (
          <div className="space-y-2">
            <p className="font-semibold text-lg overflow-hidden">Brands</p>
            <ul className="max-h-[20vh] overflow-auto">
              {results.brands.map((b) => (
                <li onClick={onClose} key={b.id}>
                  <Link to={`/brands/${b.value?.toLowerCase()}`}>
                    <p className="w-full tex-md p-2 cursor-pointer overflow-hidden truncate hover:bg-[#eee] rounded-md">
                      {b.value}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {results.products?.length > 0 && (
          <div className="my-4 space-y-2">
            <p className="font-semibold text-lg">Products</p>
            <ul className="max-h-[40vh] overflow-auto">
              {results.products?.map((product) => {
                let linkTo = "/products/" + product?.id + "?";
                const customValues = Object.keys(
                  product?.variations[0]?.customAttributes
                );
                customValues.forEach((k, i) => {
                  linkTo += `${k}=${encodeURIComponent(
                    product?.variations[0]?.customAttributes[k]
                  )}&`;
                });
                return (
                  <li onClick={onClose} key={product.id}>
                    <Link
                      to={linkTo}
                      className="flex items-center hover:bg-[#eee] overflow-hidden "
                    >
                      <img
                        className="w-[2rem] h-[2rem] object-cover object-center  rounded-md "
                        src={product.variations[0].images[0]}
                        alt={product.title}
                      />
                      <p className="w-full  cursor-pointer p-2 rounded-md truncate overflow-hidden">
                        {product.title}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (!loading && results?.error) {
    content = <p className="w-full mx-auto flex p-3">{results.error}</p>;
  }

  return (
    <>
      <div
        onClick={onClose}
        className="min-h-screen z-10 min-w-[100vw] absolute top-0 left-0 bg-[rgba(0,0,0,0.9)]"
      />
      <Button
        onClick={onClose}
        className="absolute p-2 rounded-full bg-white top-2 right-2 md:top-8 md:right-10 z-30 group"
      >
        <X
          strokeWidth={3}
          size={22}
          className="text-black group-hover:scale-110"
        />
      </Button>
      <section className="z-20 flex-col gap-4 absolute top-0 mt-20 left-0 mx-auto w-full flex items-center justify-center">
        <div
          onClick={() => inputRef.current.focus()}
          className="flex gap-4 transition delay-100 xl: ease-in-out items-center bg-white rounded-md xl:py-1.5 py-2 px-3 cursor-pointer border border-gray-100 shadow-sm"
        >
          <SearchIcon size={20} />
          <input
            autoFocus
            ref={inputRef}
            className="disabled:cursor-pointer placeholder:text-sm xl:block bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 w-full"
            type="text"
            placeholder="Search here.."
            onChange={onValueChange}
          />
        </div>
        {content && (
          <div className="lg:w-[30rem] w-[90vw] ml-4 mr-4 mx-auto overflow-y-auto bg-white rounded-md">
            {content}
          </div>
        )}
      </section>
    </>
  );
};

export default SearchPage;

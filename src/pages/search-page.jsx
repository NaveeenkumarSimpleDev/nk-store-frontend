import { SearchIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { searchProducts } from "../feautures/product/productAPI";

const SearchPage = ({ setOpen }) => {
  const [loading, setLoading] = useState();
  const [products, setProducts] = useState([]);
  let timeout;

  const onClose = () => setOpen(false);

  const onValueChange = useCallback(async (e) => {
    setLoading(true);
    const query = e.target.value;
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      const results = await searchProducts(query);
      setProducts(results);
      setLoading(false);
    }, 1000);
  });

  let content;

  if (loading) {
    content = <p className="w-full mx-auto">Loading....</p>;
  }

  if (products?.length > 0 && !loading) {
    content = (
      <ul>
        {products.map((product) => (
          <li onClick={onClose} key={product.id}>
            <Link to={`/products/${product.id}`}>
              <p className="w-full cursor-pointer hover:bg-[#eee] p-2 rounded-md">
                {product.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  if (loading !== undefined && !loading && products?.length === 0) {
    content = <p>No results.</p>;
  }

  return (
    <>
      <div
        onClick={onClose}
        className="min-h-screen z-10 min-w-[100vw] absolute top-0 left-0 bg-[rgba(0,0,0,0.9)]"
      />
      <section className="z-20 flex-col gap-4 absolute top-0 mt-20 left-0 mx-auto w-full flex items-center justify-center">
        <div className="flex gap-4 transition delay-100 xl: ease-in-out items-center bg-white rounded-md xl:py-1.5 py-2 px-3 cursor-pointer border border-gray-100 shadow-sm">
          <SearchIcon size={20} />
          <input
            className="disabled:cursor-pointer placeholder:text-sm xl:block bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 w-full"
            type="text"
            placeholder="Search here.."
            onChange={onValueChange}
          />
        </div>
        {content && (
          <div className="w-[30rem] p-2 mx-auto overflow-y-auto bg-white rounded-md">
            {content}
          </div>
        )}
      </section>
    </>
  );
};

export default SearchPage;

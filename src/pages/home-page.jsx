import { Link, useLocation, useRouteLoaderData } from "react-router-dom";
import CartegoryCard from "../components/category-card";
import { CATEGORIES } from "../config";
import { useEffect, useState } from "react";
import Model from "../components/model";
import SuccessPage from "../components/success";

import { useDispatch } from "react-redux";
import { setUser } from "../feautures/auth/authSlice";
import NetworkError from "../components/network-error";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const user = useRouteLoaderData("root");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  if (user?.error) {
    return <NetworkError />;
  }

  // for vercel deployment after payment success
  useEffect(() => {
    if (location.search === "?checkout_success=true") {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [location.search]);
  return (
    <>
      {success && (
        <Model>
          <SuccessPage />
        </Model>
      )}
      <div className="w-full flex flex-col gap-4 mt-6">
        <header className="bg-gradient-to-r  from-green-300 to-pink-300 py-4 md:py-6 lg:py-8 xl:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center ">
            <div className="text-center md:text-left">
              <h2 className="text-base font-semibold text-center text-indigo-600 tracking-wide uppercase">
                Welcome to NK store.
              </h2>
              <p className="mt-1 text-4xl text-center font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Quality guaranteed, fast shipping, and exclusive deals.
              </p>
              <p className=" mt-5 mx-auto text-center md:mx-0 text-xl text-gray-500">
                Discover, shop, and elevate your lifestyle with us! 📦🎉🛍️
                #NKStore #ShopNow
              </p>
            </div>
            <div className=" mt-6">
              <Link
                to="/products"
                className="w-fit bg-black py-2 px-4 rounded-md flex items-center text-white font-semibold hover:opacity-70"
              >
                <span>Shop now</span>
                <ArrowRight size={18} className="mt-1 ml-2" />
              </Link>
            </div>
          </div>
        </header>

        {/* categories */}

        <div className="space-y-4 mt-4">
          <h2 className="text-2xl font-bold">Categories</h2>

          {/* <div className="grid gap-2 lg:grid-cols-3 grid-cols-2 "> */}
          <div className="grid grid-cols-6 gap-2 max-md:grid-cols-3 overflow-auto ">
            {CATEGORIES.map((cat, idx) => (
              <div key={idx} className="">
                <CartegoryCard
                  title={cat.title}
                  img={cat.image}
                  key={cat.title}
                  href={cat.href}
                />
              </div>
            ))}
            {/* <CartegoryCard title="All Categories" href="/categories" /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;

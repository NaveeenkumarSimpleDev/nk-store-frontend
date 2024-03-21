import { Link, useLocation, useRouteLoaderData } from "react-router-dom";
import Heading from "../components/ui/heading";
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
        <Model
          backButtonHref="/"
          className="z-[151] h-fit w-fit m-auto fixed flex items-center justify-center"
        >
          <SuccessPage />
        </Model>
      )}
      <div className="w-full flex flex-col gap-4">
        <div className=" lg:mt3 flex flex-col max-md:bg-right md:pt-8 p-6 lg:py-20  items-center justify-center w-full gap-3 bg-[url('https://res.cloudinary.com/dzpspuks7/image/upload/v1707458771/c8pnyvt0bzv3c7ybfayw.png')] bg-opacity-50 bg-cover bg-center rounded-md">
          <div>
            <h1 className="sm:text-3xl text-center text-2xl lg:text-4xl xl:text-5xl font-bold">
              Welcome to
              <span className="ml-2 bg-gradient-to-r from-purple-950 to-red-600 text-transparent bg-clip-text">
                Nk store.
              </span>
            </h1>

            <h2 className="text-lg sm:text-xl xl:text-2xl text-center mt-2 font-bold flex gap-1">
              <span className="max-w-[600px]">
                <p className="text-md font-bold max-w-3xl">
                  Quality guaranteed, fast shipping, and exclusive deals.
                  Discover, shop, and elevate your lifestyle with us! 🛍️🌟🚀
                  #NKStore #ShopNow
                </p>
              </span>
            </h2>
          </div>

          <div className="mt-4">
            <Link
              to="/products"
              className="w-fit bg-black py-2 px-4 rounded-md flex items-center text-white font-semibold hover:opacity-70"
            >
              <span>Shop now</span>
              <ArrowRight size={18} className="mt-1 ml-2" />
            </Link>
          </div>
        </div>

        {/* categories */}

        <div className="space-y-4">
          <Heading title={"Categories"} />

          <div className="grid gap-2 lg:grid-cols-3 grid-cols-2 ">
            {CATEGORIES.map((cat) => (
              <CartegoryCard
                title={cat.title}
                img={cat.image}
                key={cat.title}
                href={cat.href}
              />
            ))}
            <CartegoryCard title="All Categories" href="/categories" />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;

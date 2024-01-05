import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full flex mt-10">
      <div className="flex flex-col mt-4 md:mt-8 items-center justify-center w-full gap-3">
        <div>
          <h1 className="sm:text-3xl text-center text-2xl lg:text-4xl xl:text-5xl font-bold">
            Welcome to
            <span className="ml-2 bg-gradient-to-r from-purple-950 to-red-600 text-transparent bg-clip-text">
              Nk store.
            </span>
          </h1>

          <h2 className="text-lg mt-4 sm:text-xl xl:text-2xl text-center mt-2 font-bold flex gap-1">
            <span className="max-w-[600px]">
              <p className="text-md font-medium max-w-3xl">
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
            className="w-fit bg-black py-2 px-4 rounded-md text-white font-semibold hover:opacity-70"
          >
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

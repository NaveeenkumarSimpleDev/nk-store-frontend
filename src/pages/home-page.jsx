import { Link } from "react-router-dom";
import TypewriterComponent from "typewriter-effect";

const HomePage = () => {
  return (
    <div className="w-full flex mt-10">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="sm:text-2xl text-xl xl:text-4xl font-bold">
            Welcome to
            <span className="ml-2 bg-gradient-to-r from-purple-950 to-red-600 text-transparent bg-clip-text">
              Nk store.
            </span>
          </h1>

          <h2 className="text-lg xl:text-2xl mt-2 font-bold flex gap-1">
            <span>- Explore </span>
            <span>
              <p className="text-md font-medium max-w-3xl">
                Shop, Elevate. Your one-stop destination for fashion,
                electronics, and lifestyle essentials. Quality guaranteed, fast
                shipping, and exclusive deals. Discover, shop, and elevate your
                lifestyle with us! 🛍️🌟🚀 #NKStore #ShopNow
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

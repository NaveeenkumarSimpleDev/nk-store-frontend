import { Link } from "react-router-dom";
import TypewriterComponent from "typewriter-effect";

const HomePage = () => {
  return (
    <div className="w-full flex mt-10">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="sm:text-2xl xl:text-4xl font-bold">
            Welcome to
            <span class="ml-2 bg-gradient-to-r from-purple-950 to-red-600 text-transparent bg-clip-text">
              Nk store.
            </span>
          </h1>

          <h2 className="text-lg xl:text-2xl mt-2 font-bold flex gap-1">
            <span>Explore - </span>
            <span>
              <TypewriterComponent
                options={{
                  strings: [
                    `<span style='color:purple;'> Fashion </span>`,
                    `<span style='color:green;'> Lifestyle </span>`,
                    `<span style='color:red;'> Electronics </span>`,
                    `<span style='color:gold;'> Mobiles </span>`,
                    `<span style='color:violet;'> Beauty items </span>`,
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h2>
        </div>
        <div>
          <p className="text-lg font-medium max-w-3xl">
            Discover a diverse selection of products at NK Store. From fashion
            and electronics to lifestyle essentials, we have everything you
            need. Shop now and explore a world of endless possibilities!
          </p>
          <p className="font-semibold mt-3">
            Unlock a world of endless possibilities at NK Store. Explore our
            extensive range of products, from trendy fashion to cutting-edge
            electronics and lifestyle essentials. With unbeatable deals and
            top-notch customer service, we're here to make your shopping
            experience truly remarkable. 🛍️ Fashion, Electronics, Lifestyle:
            Find it all in one place. 🌟 Quality Guaranteed: Handpicked products
            for your satisfaction. 🚀 Fast & Reliable Shipping: Get your
            favorites delivered in no time. 🎁 Exclusive Deals: Discover special
            offers just for you. Discover, Shop, and Elevate Your Lifestyle with
            NK Store!
          </p>
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

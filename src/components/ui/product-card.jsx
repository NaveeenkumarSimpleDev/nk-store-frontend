import { HeartIcon } from "lucide-react";
import StarRating from "../star-rating";
import { AspectRatio } from "./aspect-ratio";
import Button from "./button";
import { cn, formatPrice } from "../../lib/utils";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";
import {
  addToCartAsync,
  selectCartItems,
} from "../../feautures/cart/cartSlice";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const disptch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);

  const {
    id: productId,
    title,
    description,
    price,
    discountPrice,
    rating,
  } = product;
  const faviourate = true;
  const formatTitle =
    title?.length < 12 ? title : title?.slice(0, 12)?.concat("..");

  const cartIems = useSelector(selectCartItems);
  const addToCartHandler = useCallback(() => {
    const exixtingItem = cartIems?.find((item) => item.id === product.id);
    if (exixtingItem) {
      return toast.error("Item already in cart");
    }
    disptch(
      addToCartAsync({
        userId: loggedInUser?.id,
        product,
      })
    );
  }, [cartIems]);

  return (
    <>
      {product ? (
        <section className="rounded-lg border flex flex-col">
          <div className=" border-b p-0">
            <AspectRatio ratio={6 / 4}>
              <Link to={productId}>
                <img
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  // src="https://skateshop.sadmn.com/_next/image?url=https%3A%2F%2Fuploadthing.com%2Ff%2F2d556c2c-55d9-4f4e-aa68-cce5b8b6a4cd_Screenshot%25202023-03-12%2520140334.png&w=828&q=75"
                  alt="Photo by Drew Beamer"
                  sizes="(max-width:768px)100vw, (max-width:1200px)50vw,33vw"
                  className="object-cover relative h-full w-full"
                />
              </Link>
              <Button className="absolute hover:scale-110 transition duration-200 top-3 right-3 p-2 rounded-full">
                <HeartIcon
                  size={14}
                  className={cn(faviourate && "fill-rose-500")}
                />
              </Button>
            </AspectRatio>
          </div>

          <div className="py-4">
            <div className="px-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-2xl mb-1 font-bold">{formatTitle}</span>
                  <span className="text-sm m-0 w-[10rem] font-medium truncate overflow-ellipsis">
                    {description}
                  </span>
                  <div className="mt-4">
                    <StarRating rating={4.5} totalRatings={rating} />
                  </div>
                </div>

                <div className="ml-auto flex flex-col flex-shrink-0">
                  <span className="text-xl font-bold">
                    {formatPrice(discountPrice)}
                  </span>
                  <span className="text-sm font-semibold line-through">
                    {formatPrice(price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link to={productId}>
                  <Button className="m-0 font-semibold bg-transparent text-black border hover:bg-accent">
                    Preview
                  </Button>
                </Link>
                <Button
                  onClick={addToCartHandler}
                  className="m-0 font-semibold"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="border rounded-lg p-4 animate-pulse">
          <div className="h-48 bg-gray-300 mb-4 rounded-lg"></div>
          <div className="flex items-center gap-4">
            <div className="w-3/4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-3/4 h-4 bg-gray-300 mt-4 rounded-full"></div>
        </div>
      )}
    </>
  );
};

export default ProductCard;

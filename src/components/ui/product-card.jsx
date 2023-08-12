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
import React, { useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  addToFavouritesAsync,
  removeFavouritesAsync,
} from "../../feautures/product/productSlice";

const ProductCard = ({ product, favourite }) => {
  const dispatch = useDispatch();
  const cartIems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);

  const {
    id: productId,
    title,
    description,
    price,
    discountPrice,
    rating,
  } = product;

  const favouriteHandler = useCallback(() => {
    if (favourite) {
      dispatch(
        removeFavouritesAsync({
          userId: loggedInUser?.id,
          productId: product?.id,
        })
      );
    } else {
      dispatch(
        addToFavouritesAsync({
          userId: loggedInUser?.id,
          productId: product?.id,
        })
      );
    }
  }, [loggedInUser, product]);

  const formatTitle =
    title?.length < 12 ? title : title?.slice(0, 12)?.concat("..");

  const addToCartHandler = useCallback(() => {
    const exixtingItem = cartIems?.find((item) => item.id === product.id);
    if (exixtingItem) {
      return toast.error("Item already in cart");
    }
    dispatch(
      addToCartAsync({
        userId: loggedInUser?.id,
        product: {
          ...product,
          size: product?.sizes[0],
          color: product?.colors[0],
        },
      })
    );
  }, [cartIems, loggedInUser, product]);

  return (
    <>
      {product ? (
        <section className="rounded-lg border flex flex-col">
          <div className=" border-b p-0">
            <AspectRatio ratio={6 / 4}>
              {product?.images ? (
                <img
                  loading="lazy"
                  src={product?.images[0]}
                  sizes="(max-width:768px)100vw, (max-width:1200px)50vw,33vw"
                  className="object-cover rounded-t-lg relative h-full w-full"
                  alt={product?.title}
                />
              ) : (
                <img
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  sizes="(max-width:768px)100vw, (max-width:1200px)50vw,33vw"
                  className="object-cover relative h-full w-full"
                />
              )}

              <Button
                onClick={favouriteHandler}
                className="absolute hover:scale-110 transition duration-200 top-2 right-2 p-1.5 rounded-full"
              >
                <HeartIcon
                  size={18}
                  className={cn(favourite && "fill-rose-500")}
                />
              </Button>
            </AspectRatio>
          </div>

          <div className="py-4">
            <div className="px-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Link to={productId}>
                  <div className="flex flex-col">
                    <span className="text-xl xl:text-2xl mb-1 w-[10rem] truncate font-bold">
                      {formatTitle}
                    </span>
                    <span className="text-sm xl:text-md m-0 w-[10rem] font-medium truncate overflow-ellipsis">
                      {description}
                    </span>
                    <div className="mt-4">
                      <StarRating rating={4.5} totalRatings={rating} />
                    </div>
                  </div>
                </Link>
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

export default React.memo(ProductCard);

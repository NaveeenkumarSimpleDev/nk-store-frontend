import { HeartIcon, Loader2 } from "lucide-react";
import StarRating from "../star-rating";
import { AspectRatio } from "./aspect-ratio";
import Button from "./button";
import { cn, formatPrice } from "../../lib/utils";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  addToFavouritesAsync,
  removeFavouritesAsync,
  selectFavourites,
} from "../../feautures/product/productSlice";
import { useCart } from "../../hooks/useCart";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavourites)?.favourites;
  const [loading, setLoading] = useState(false);
  const { addToCart, cartItems, handleCartOpen } = useCart();
  const loggedInUser = useSelector(selectLoggedInUser);
  const {
    id: productId,
    title,
    description,
    rating,
    discountPrice,
    mrp,
  } = product;
  const exsistingCartItem = cartItems?.find((item) => item.id === product.id);
  const isFavourite = favourites?.includes(productId);
  const favouriteHandler = () => {
    if (!loggedInUser) {
      toast.error("Please login to add favourites");
      return;
    }

    if (isFavourite) {
      dispatch(removeFavouritesAsync({ userId: loggedInUser?.id, productId }));
    } else {
      dispatch(addToFavouritesAsync({ userId: loggedInUser?.id, productId }));
    }
  };

  const addToCartHandler = () => {
    if (!product || !product?.variations) return;
    setLoading(true);
    addToCart({
      ...product,
      variations: product?.variations[0],
      quantity: 1,
    }).finally(() => {
      setLoading(false);
    });
  };

  let linkTo = "/products/" + product?.id + "?";
  const customAttributes = product?.variations[0]?.customAttributes;

  if (customAttributes) {
    const customValues = Object.keys(customAttributes);
    customValues.forEach((key) => {
      linkTo += `${key}=${customAttributes[key]}&`;
    });
  }
  return (
    <>
      <section className="rounded-lg border flex flex-col">
        <div className=" border-b p-0">
          <AspectRatio ratio={6 / 4}>
            {product?.variations ? (
              <img
                loading="lazy"
                src={product?.variations[0]?.images[0]}
                sizes="(max-width:768px)100vw, (max-width:1200px)50vw,33vw"
                className="object-cover object-center rounded-t-lg relative h-full w-full"
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
                className={cn(isFavourite && "fill-rose-500")}
              />
            </Button>
          </AspectRatio>
        </div>

        <div className="py-4">
          <div className="px-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 overflow-hidden">
                <Link to={linkTo}>
                  <div className="flex flex-col">
                    <span className="text-lg xl:text-xl mb-1 truncate font-bold overflow-ellipsis">
                      {title}
                    </span>
                    <span className="text-sm xl:text-md m-0 w-[10rem] font-medium truncate overflow-ellipsis">
                      {description}
                    </span>
                    <div className="mt-4 items-start flex">
                      <StarRating rating={4.5} totalRatings={rating} />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="ml-auto flex flex-col flex-shrink-0">
                <span className="text-xl font-bold">
                  {formatPrice(discountPrice)}
                </span>
                <span className="text-sm font-semibold line-through">
                  {formatPrice(mrp)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to={linkTo}>
                <Button className="m-0 font-semibold bg-transparent text-black border hover:bg-accent">
                  View Product
                </Button>
              </Link>
              <Button
                disabled={loading}
                onClick={() => {
                  return exsistingCartItem
                    ? handleCartOpen()
                    : addToCartHandler();
                }}
                className="m-0 font-semibold disabled:opacity-75"
              >
                {loading ? (
                  <div className="flex items-center gap-x-1 justify-center">
                    <Loader2 className="h-4 animate-spin" />
                    <span className="font-semibold">Adding..</span>
                  </div>
                ) : exsistingCartItem ? (
                  "View in Cart"
                ) : (
                  "Add to cart"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCard;

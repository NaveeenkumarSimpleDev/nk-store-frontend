import { Trash } from "lucide-react";
import StarRating from "../../components/star-rating";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import Button from "../../components/ui/button";
import { formatPrice } from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";

import React from "react";
import { deleteProductById } from "../../feautures/admin/adminApi";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {
    id: productId,
    title,
    description,
    rating,
    discountPrice,
    mrp,
  } = product;
  const formatTitle =
    title?.length < 12 ? title : title?.slice(0, 12)?.concat("..");

  let linkTo = "/products/" + product?.id;
  const customAttributes = product?.variations[0]?.customAttributes;

  if (customAttributes) {
    const customValues = Object.keys(customAttributes);

    if (customValues[0]) {
      linkTo += `?${customValues[0]}=${encodeURIComponent(
        customAttributes[customValues[0]]
      )}`;
    }
    if (customValues[1]) {
      linkTo += `&${customValues[1]}=${encodeURIComponent(
        customAttributes[customValues[1]]
      )}`;
    }
    if (customValues[2]) {
      linkTo += `&${customValues[2]}=${encodeURIComponent(
        customAttributes[customValues[2]]
      )}`;
    }
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
              className="absolute bg-red-200 top-2 right-2 p-1.5 rounded-full"
              onClick={() => {
                const isDelete = confirm(
                  "Are you sure delete this product!!, product cannot be recovered."
                );

                if (isDelete) deleteProductById(product?.id, navigate);
              }}
            >
              <Trash className="w-5 h-5 text-destructive text-center" />
            </Button>
          </AspectRatio>
        </div>

        <div className="py-4">
          <div className="px-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 overflow-hidden">
                <Link to={linkTo}>
                  <div className="flex flex-col">
                    <span className="text-md xl:text-xl mb-1 truncate font-bold overflow-ellipsis">
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
                <span className="text-md font-bold">
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
              <Link to={"edit/" + product?.id}>
                <Button className="m-0 px-6 font-semibold disabled:opacity-75 bg-blue-500">
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(ProductCard);

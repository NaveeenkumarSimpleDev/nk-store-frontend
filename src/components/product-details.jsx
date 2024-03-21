import React, { useEffect, useState } from "react";
import ImageCarousel from "./Image-carousel";
import RadioButton from "./ui/radio-button";
import Button from "./ui/button";
import { Heart, Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import { cn, formatPrice } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectFavourites,
  selectProductById,
} from "../feautures/product/productSlice";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingIndigator from "./loading-indicator";
import { useCart } from "../hooks/useCart";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import { addToFavourites } from "../feautures/product/productAPI";

const ProductDetails = () => {
  const { productId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProductById);
  const loggedInUser = useSelector(selectLoggedInUser);
  const favourites = useSelector(selectFavourites);
  const isFavourite = favourites?.includes(product?.id);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems, handleCartOpen } = useCart();
  const [selectedAttributes, setSelectedAttributes] = useState();
  const [attributes, setAttributes] = useState([]);
  const [firstAvailabeAttributes, setFirstAvaileAttributes] = useState([]);
  const [secondAvailableAttributes, setSecondAvailableAttributes] = useState(
    []
  );

  useEffect(() => {
    dispatch(fetchProductByIdAsync(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (!product) return;
    const searchParams = new URLSearchParams(location.search);
    const keys = Array.from(searchParams.keys());
    const values = Array.from(searchParams.values());

    setImages(product?.variations[0]?.images);

    if (!keys.length) {
      setSelectedAttributes(product?.variations[0]?.customAttributes);
      return;
    }

    let keyValuePair = {};
    keys.forEach((key, index) => {
      keyValuePair[key] = values[index];
    });

    setSelectedAttributes(keyValuePair);

    const attributes = Object.keys(
      product?.variations[0]?.customAttributes || {}
    );
    setAttributes(attributes);
  }, [product]);

  useEffect(() => {
    if (!selectedAttributes) return;
    const newSearchParams = new URLSearchParams(location.search);
    Object.entries(selectedAttributes).forEach(([key, value]) => {
      newSearchParams.set(key, value);
    });
    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
  }, [selectedAttributes]);

  const handleChange = (attributeType, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeType]: value,
    }));
  };

  const handleFirstAttributeChange = (value) => {
    const defaultSelected = product?.variations?.find(
      (item) => item.customAttributes[attributes[0]] == value
    );

    if (defaultSelected) {
      setSelectedAttributes(defaultSelected?.customAttributes);
      setImages(defaultSelected?.images);
    }
  };

  const getAvailableAttributes = (attributeType) => {
    const attributes = new Set();

    product?.variations.forEach((variation) => {
      const attributeValue = variation.customAttributes[attributeType];
      if (attributeValue) {
        attributes.add(attributeValue);
      }
    });

    return Array.from(attributes);
  };

  useEffect(() => {
    if (!product?.variations) return;
    if (!selectedAttributes) return;
    // setAvailabe for First
    const fAtt = attributes[0] == "color" ? "color" : attributes[1];
    const availableProducts = product?.variations?.filter(
      (variation) =>
        variation.customAttributes[fAtt] === selectedAttributes[fAtt]
    );
    const availableFirstValues = availableProducts?.map(
      (item) => item.customAttributes[attributes[1]]
    );
    setFirstAvaileAttributes(availableFirstValues);

    // seAvailable for second
    if (attributes[2]) {
      const availableSeconstAttributes = availableProducts?.filter(
        (item) =>
          item.customAttributes[attributes[1]] ==
          selectedAttributes[attributes[1]]
      );
      const availabelSecondValues = availableSeconstAttributes?.map(
        (item) => item.customAttributes[attributes[2]]
      );
      setSecondAvailableAttributes(availabelSecondValues);
    }
  }, [selectedAttributes]);

  const handleInc = () => {
    if (quantity === 10) {
      return toast.error("max-quantity reached!");
    }
    setQuantity((prev) => prev + 1);
  };

  const handleDec = () => {
    setQuantity((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    if (!loggedInUser) {
      return navigate("/login", {
        state: { from: location.pathname + location.search },
      });
    }

    const selectedVariation = product?.variations?.find((item) => {
      if (attributes?.length === 1) {
        if (
          item?.customAttributes[attributes[0]] ===
          selectedAttributes[attributes[0]]
        ) {
          return item;
        }
      } else if (attributes?.length === 2) {
        if (
          item?.customAttributes[attributes[0]] ===
            selectedAttributes[attributes[0]] &&
          item?.customAttributes[attributes[1]] ===
            selectedAttributes[attributes[1]]
        ) {
          return item;
        }
      } else if (attributes?.length === 3) {
        if (
          item?.customAttributes[attributes[0]] ===
            selectedAttributes[attributes[0]] &&
          item?.customAttributes[attributes[1]] ===
            selectedAttributes[attributes[1]] &&
          item?.customAttributes[attributes[2]] ===
            selectedAttributes[attributes[2]]
        ) {
          return item;
        }
      }
      return undefined;
    });

    const hasImage = selectedVariation?.images;
    setLoading(true);
    addToCart({
      ...product,
      quantity,
      variations:
        hasImage && hasImage.length > 0
          ? selectedVariation
          : { ...selectedVariation, images: product?.variations[0]?.images },
    }).finally(() => {
      setLoading(false);
    });
  };

  const exsistingCartItem = cartItems?.find(
    (item) => item?.product?.id === product?.id
  );

  return (
    <>
      {!product ? (
        <div className="fixed inset-0 h-screen flex items-center justify-center">
          <LoadingIndigator />
        </div>
      ) : (
        <section className="mt-6 pb-[3rem] gap-4 grid lg:grid-cols-2 lg:gap-8">
          <div>
            <ImageCarousel images={images} />
            <hr className=" mt-6 lg:hidden" />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-bold text-2xl 2xl:text-3xl">
                {product?.title}
              </h1>
              <p className=" font-medium text-sm 2xl:text-md my-2">
                {product?.description}
              </p>
              <p className="grid mt-4">
                <span className="font-bold text-sm md:text-lg">
                  {formatPrice(product?.variations[0]?.price)} or ${" "}
                  {(Number(product?.variations[0]?.price) / 6).toFixed(2)}/month
                </span>
                <span className="font-semibold text-xs md:text-sm">
                  Suggest payments with 6 months special financing
                </span>
              </p>
            </div>

            {/* First attribute */}
            {getAvailableAttributes(attributes[0]) && (
              <div className="space-y-3">
                <span className="text-xl font-semibold capitalize">
                  {attributes[0]}
                </span>
                <div className="flex gap-3">
                  {getAvailableAttributes(attributes[0]).map((item, idx) => (
                    <RadioButton
                      key={`${item}${idx}`}
                      type={
                        attributes[0]?.toLowerCase() == "color"
                          ? "colors"
                          : "size"
                      }
                      id={item}
                      checked={selectedAttributes[attributes[0]] === item}
                      color={item}
                      onChange={() => handleFirstAttributeChange(item)}
                      label={item}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* second attributes */}
            {product?.variations &&
              Object.keys(product?.variations[0]?.customAttributes)[1] && (
                <div>
                  <span className="text-xl font-semibold capitalize">
                    {attributes[1]}
                  </span>
                  <div className="mt-3 flex gap-4">
                    {getAvailableAttributes(attributes[1])?.map((item, idx) => {
                      const disabled = !firstAvailabeAttributes?.includes(item);
                      return (
                        <RadioButton
                          key={`${item}${idx}`}
                          type={"size"}
                          id={`${item}${idx}`}
                          label={item}
                          checked={selectedAttributes[attributes[1]] == item}
                          disabled={disabled}
                          onChange={() => handleChange(attributes[1], item)}
                          className={
                            disabled
                              ? "cursor-not-allowed bg-gray-300 text-opacity-50"
                              : ""
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              )}

            {/* third attributes */}
            {product?.variations &&
              Object.keys(product?.variations[0]?.customAttributes)[2] && (
                <div>
                  <span className="text-xl font-semibold capitalize">
                    {attributes[2]}
                  </span>
                  <div className="mt-3 flex gap-4">
                    {getAvailableAttributes(attributes[2])?.map((item, idx) => {
                      const disabled =
                        !secondAvailableAttributes?.includes(item);
                      return (
                        <RadioButton
                          key={`${item}${idx}`}
                          type={"size"}
                          id={`${item}${idx}`}
                          label={item}
                          checked={selectedAttributes[attributes[2]] === item}
                          disabled={disabled}
                          onChange={() => handleChange(attributes[2], item)}
                          className={
                            disabled
                              ? "cursor-not-allowed bg-gray-300 text-opacity-50"
                              : ""
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              )}

            {/* quantity */}
            <div>
              <h4 className="font-semibold text-xl">Quantity</h4>
              <div className=" mt-2 flex items-center gap-3">
                <Button
                  disabled={quantity === 1}
                  onClick={handleDec}
                  className="p-1 bg-white border"
                >
                  <Minus size={20} className="fill-black text-black" />
                </Button>
                <span className="font-semibold text-xl">{quantity}</span>
                <Button onClick={handleInc} className="p-1 bg-white border">
                  <Plus size={20} className="fill-black text-black" />
                </Button>
              </div>
            </div>
            {/* Actions */}
            <div className="flex max-[410px]:flex-col sm:gap-6 gap-4 ">
              <Button
                disabled={loading}
                isLoading={loading}
                onClick={() => {
                  return exsistingCartItem
                    ? handleCartOpen()
                    : addToCartHandler();
                }}
                className="font-semibold shrink-0"
              >
                <span>
                  {loading ? (
                    <div className="flex items-center gap-x-1 justify-center">
                      <Loader2 className="h-4 animate-spin" />
                      <span>Adding...</span>
                    </div>
                  ) : exsistingCartItem ? (
                    <div className="flex gap-3 items-center justify-center">
                      <ShoppingCart size={20} />
                      <span>View in Cart</span>
                    </div>
                  ) : (
                    <div className="flex gap-3 items-center justify-center">
                      <ShoppingCart size={20} />
                      <span>Add to cart</span>
                    </div>
                  )}
                </span>
              </Button>

              <Button
                onClick={() => {
                  if (!loggedInUser) return;
                  if (isFavourite) {
                    navigate("/favourites");
                    return;
                  }
                  addToFavourites(
                    { userId: loggedInUser?.id, productId: product?.id },
                    dispatch
                  );
                }}
                className="font-semibold transition duration-300 ease-linear  bg-white text-black border border-black "
              >
                <span className=" flex items-center justify-center gap-3 ">
                  <Heart
                    size={20}
                    className={cn("", isFavourite && "fill-rose-700")}
                  />
                  <span>{isFavourite ? "Go" : "Add"} to Favourites</span>
                </span>
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetails;

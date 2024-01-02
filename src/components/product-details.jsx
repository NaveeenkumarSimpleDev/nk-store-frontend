import React, { useEffect, useState } from "react";
import ImageCarousel from "./Image-carousel";
import RadioButton from "./ui/radio-button";
import Button from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { formatPrice } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "../feautures/product/productSlice";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingIndigator from "./loading-indicator";
import { useCart } from "../hooks/useCart";
import { selectLoggedInUser } from "../feautures/auth/authSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProductById);
  const loggedInUser = useSelector(selectLoggedInUser);

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems, handleCartOpen } = useCart();
  const [selectedAttributes, setSelectedAttributes] = useState();
  const [attributes, setAttributes] = useState([]);
  const [firstAvailabeAttributes, setFirstAvaileAttributes] = useState([]);
  const [secondAvailableAttributes, setSecondAvailableAttributes] = useState(
    [],
  );

  useEffect(() => {
    dispatch(fetchProductByIdAsync(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (!product) return;
    setSelectedAttributes(product?.variations[0]?.customAttributes);

    const attributes = Object.keys(
      product?.variations[0]?.customAttributes || {},
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
      (item) => item.customAttributes[attributes[0]] == value,
    );

    if (defaultSelected) {
      setSelectedAttributes(defaultSelected?.customAttributes);
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
        variation.customAttributes[fAtt] === selectedAttributes[fAtt],
    );
    const availableFirstValues = availableProducts?.map(
      (item) => item.customAttributes[attributes[1]],
    );
    setFirstAvaileAttributes(availableFirstValues);

    // seAvailable for second
    if (attributes[2]) {
      const availableSeconstAttributes = availableProducts?.filter(
        (item) =>
          item.customAttributes[attributes[1]] ==
          selectedAttributes[attributes[1]],
      );
      const availabelSecondValues = availableSeconstAttributes?.map(
        (item) => item.customAttributes[attributes[2]],
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
      return navigate("/login", { state: { from: location.pathname } });
    }

    const selectedVariation = product?.variations?.find((item) => {
      if (attributes?.length == 1) {
        if (item?.customAttributes[attributes[0]] == selectedAttributes[0])
          return item;
      }

      if (attributes.length == 2) {
        if (
          item?.customAttributes[attributes[0]] == selectedAttributes[0] &&
          item?.customAttributes[attributes[1]] == selectedAttributes[1]
        )
          return item;
      }

      if (
        item?.customAttributes[attributes[0]] == selectedAttributes[0] &&
        item?.customAttributes[attributes[1]] == selectedAttributes[1] &&
        item?.customAttributes[attributes[2]] == selectedAttributes[2]
      )
        return item;
    });
    const hasImage = selectedVariation?.images;
    setLoading(true);
    addToCart({
      ...product,
      quantity,
      variations: hasImage
        ? selectedVariation
        : { ...selectedVariation, images: product?.variations[0]?.images },
    }).finally(() => {
      setLoading(false);
    });
  };

  const exsistingCartItem = cartItems?.find((item) => item?.id === product?.id);

  return (
    <>
      {!product ? (
        <div className="fixed inset-0 h-screen flex items-center justify-center">
          <LoadingIndigator />
        </div>
      ) : (
        <section className="mt-6 pb-[3rem] gap-6 grid lg:grid-cols-2 lg:gap-8">
          <div>
            <ImageCarousel />
            <hr className=" mt-8 lg:hidden" />
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
                <span className="font-bold text-xl">
                  {formatPrice(product?.variations[0]?.price)} or ${" "}
                  {(Number(product?.variations[0]?.price) / 6).toFixed(2)}/month
                </span>
                <span className="font-semibold text-sm">
                  Suggest payments with 6 months special financing
                </span>
              </p>
            </div>

            {/* colors */}
            {getAvailableAttributes(attributes[0]) && (
              <div className="space-y-3">
                <span className="text-xl font-semibold">Colors</span>
                <div className="flex gap-3">
                  {getAvailableAttributes(attributes[0]).map((color, idx) => (
                    <RadioButton
                      key={`${color}${idx}`}
                      type={attributes[0] == "color" ? "colors" : "size"}
                      id={color}
                      checked={selectedAttributes[attributes[0]] === color}
                      color={color}
                      onChange={() => handleFirstAttributeChange(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* second attributes */}
            {product?.variations &&
              Object.keys(product?.variations[0]?.customAttributes)[1] && (
                <div>
                  <span className="text-xl font-semibold">{attributes[1]}</span>
                  <div className="mt-3 flex gap-4">
                    {getAvailableAttributes(attributes[1])?.map((item, idx) => {
                      const disabled = !firstAvailabeAttributes?.includes(item);
                      return (
                        <RadioButton
                          key={`${item}${idx}`}
                          type={"size"}
                          id={`${item}${idx}`}
                          label={item}
                          checked={selectedAttributes[attributes[1]] === item}
                          disabled={disabled}
                          onChange={() => handleChange(attributes[1], item)}
                          className={
                            disabled ? "cursor-not-allowed bg-red-100" : ""
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
                  <span className="text-xl font-semibold">{attributes[2]}</span>
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
                            disabled ? "cursor-not-allowed bg-red-100" : ""
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
                  className="p-2 bg-gray-600"
                >
                  <Plus size={20} />
                </Button>
                <span className="font-semibold text-xl">{quantity}</span>
                <Button onClick={handleInc} className="p-2 bg-gray-600">
                  <Plus size={20} />
                </Button>
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-6">
              <Button
                disabled={loading}
                // isLoading={loading}

                onClick={() => {
                  return exsistingCartItem
                    ? handleCartOpen()
                    : addToCartHandler();
                }}
                className="font-semibold"
              >
                {loading ? (
                  <div className="flex items-center gap-x-1 justify-center">
                    <Loader2 className="h-4 animate-spin" />
                    <span>Adding..</span>
                  </div>
                ) : exsistingCartItem ? (
                  "View in Cart"
                ) : (
                  "Add to cart"
                )}
              </Button>
              <Button className="bg-blue-500 font-semibold transition duration-300 ease-linear border-none hover:outline outline-2 outline-blue-500 disabled:bg-blue-300 hover:bg-white hover:text-black">
                Buy now
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default React.memo(ProductDetails);

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
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingIndigator from "./loading-indicator";
import { useCart } from "../hooks/useCart";

const ProductDetails = () => {
  const { productId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const ifColor = searchParams.get("color");
  const ifSize = searchParams.get("size");

  const [selectedColor, setSelectedColor] = useState(ifColor);
  const [selectedSize, setSelectedSize] = useState(ifSize);

  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    dispatch(fetchProductByIdAsync(productId));
  }, [productId]);

  useEffect(() => {
    // Update URL using window.history.replaceState
    searchParams.set("color", selectedColor);
    searchParams.set("size", selectedSize);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
  }, [selectedColor, selectedSize]);

  const handleChange = (type, value) => {
    if (type == "color") {
      setSelectedColor(value);
    } else if (type == "size") {
      setSelectedSize(value);
    }
  };

  const uniqueColors = Array.from(
    new Set(product?.variations?.map((item) => item?.color).filter(Boolean))
  );

  const getAvailableSizes = () => {
    const sizes = new Set();

    // If a color is selected, filter sizes based on color
    if (selectedColor) {
      product?.variations.forEach((variation) => {
        if (variation.color === selectedColor) {
          sizes.add(variation.size);
        }
      });
    } else {
      // If no color is selected, consider all sizes available
      product.variations.forEach((variation) => {
        sizes.add(variation.size);
      });
    }

    return Array.from(sizes);
  };

  const isSizeAvailable = (size) => {
    if (!selectedColor) {
      return true; // All sizes are available if no color is selected
    }

    // Check if the selected color has the given size
    return product.variations.some(
      (variation) =>
        variation.color === selectedColor && variation.size === size
    );
  };

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
    const variation = product?.variations?.filter(
      (variation) =>
        variation.size === selectedSize && variation.color === selectedColor
    );
    if (!variation) {
      return;
    }

    addToCart({
      ...product,
      variations: { ...variation[0] },
      quantity,
    });
  };

  const exsistingCartItem = cartItems?.find((item) => item.id === product.id);

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
            {uniqueColors.length > 0 && (
              <div className="space-y-3">
                <span className="text-xl font-semibold">Colors</span>
                <div className="flex gap-3">
                  {uniqueColors.map((color, idx) => (
                    <RadioButton
                      key={`${color}${idx}`}
                      type="colors"
                      id={color}
                      checked={selectedColor === color}
                      color={color}
                      onChange={() => handleChange("color", color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product?.variations[0]?.size && (
              <div>
                <span className="text-xl font-semibold">Size</span>
                <div className="mt-3 flex gap-4">
                  {getAvailableSizes().map((size, idx) => (
                    <RadioButton
                      key={`${size}${idx}`}
                      type="size"
                      id={size}
                      label={size}
                      checked={selectedSize === size}
                      disabled={!isSizeAvailable(size)}
                      className={`disabled:bg-muted border-gray-500 ${
                        selectedSize === size ? "border-black bg-accent" : ""
                      }`}
                      onChange={() => handleChange("size", size)}
                    />
                  ))}
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
                isLoading={loading}
                onClick={addToCartHandler}
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

export function loader({ params }) {
  const productId = params?.productId;

  dispatch(fetchProductByIdAsync(productId));
}

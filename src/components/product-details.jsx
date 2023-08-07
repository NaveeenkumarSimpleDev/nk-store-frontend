import { useCallback, useEffect, useState } from "react";
import ImageCarousel from "./Image-carousel";
import RadioButton from "./ui/radio-button";
import Button from "./ui/button";
import { Plus } from "lucide-react";
import { formatPrice } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "../feautures/product/productSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync, selectCartItems } from "../feautures/cart/cartSlice";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const product = useSelector(selectProductById);
  const cartIems = useSelector(selectCartItems);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.value || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0]?.valie || ""
  );

  useEffect(() => {
    dispatch(fetchProductByIdAsync(productId));
  }, []);

  const addToCartHandler = useCallback(() => {
    const exixtingItem = cartIems?.find((item) => item.id === product.id);
    if (exixtingItem) {
      return toast.error("Item already in cart");
    }
    dispatch(addToCartAsync({ userId: loggedInUser?.id, product }));
  });

  const handleOnChange = useCallback((idx, type) => {
    const setValue = type === "colors" ? setSelectedColor : setSelectedSize;
    const value = type === "colors" ? colors[idx].value : sizes[idx].value;
    setValue(value);
  }, []);

  return (
    <>
      {product ? (
        <section className="mt-6 pb-[70rem] gap-6 grid lg:grid-cols-2 lg:gap-8">
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
                  {formatPrice(product?.discountPrice)} or{" "}
                  {(Number(product?.discountPrice) / 6).toFixed(2)}/month
                </span>
                <span className="font-semibold text-sm">
                  Suggest payments with 6 months special financing
                </span>
              </p>
            </div>

            {/* colors */}
            {product?.colors?.length !== 0 && (
              <div className="space-y-3">
                <span className="text-xl font-semibold">Colors</span>
                <div className="flex gap-3">
                  {product?.colors?.map((color, idx) => (
                    <RadioButton
                      key={idx}
                      type="colors"
                      id={color.id}
                      checked={selectedColor === color.value}
                      color={color.value}
                      onChange={() => handleOnChange(idx, "colors")}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product?.sizes?.length !== 0 && (
              <div>
                <span className="text-xl font-semibold">Size</span>
                <div className="mt-3 flex gap-4">
                  {product?.sizes?.map((size, idx) => (
                    <RadioButton
                      key={idx}
                      type="size"
                      id={size.id}
                      label={size.value}
                      checked={selectedSize === size.value}
                      onChange={() => handleOnChange(idx, "size")}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* quantity */}
            <div>
              <h4 className="font-semibold text-xl">Quantity</h4>
              <div className=" mt-2 flex items-center gap-3">
                <Button className="p-2 bg-gray-600">
                  <Plus size={20} />
                </Button>
                <span className="font-semibold text-xl">2</span>
                <Button className="p-2 bg-gray-600">
                  <Plus size={20} />
                </Button>
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-6">
              <Button onClick={addToCartHandler} className="font-semibold">
                Add to cart
              </Button>
              <Button className="bg-blue-500 font-semibold transition duration-300 ease-linear border-none hover:outline outline-2 outline-blue-500 disabled:bg-blue-300 hover:bg-white hover:text-black">
                Buy now
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;

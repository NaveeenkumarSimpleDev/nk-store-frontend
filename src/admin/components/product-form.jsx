import { CATEGORIES } from "../../config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useRef, useState } from "react";
import Button from "../../components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";
import VartationForm from "./variations-form";
import { crateNewProduct, updateProduct } from "../../feautures/admin/adminApi";
import { useDispatch, useSelector } from "react-redux";
import { selectBrands } from "../../feautures/product/productSlice";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";
import Heading from "../../components/ui/heading";
import VariationModal from "./variation-modal";
import { Link, useNavigate } from "react-router-dom";
import Input from "./input";
import { useForm } from "react-hook-form";
import VariationList from "./variation-list";
import { fetchCartByUserId } from "../../feautures/cart/cartAPI";

const ProductForm = ({ product }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const brands = useSelector(selectBrands);
  const [variations, setVariations] = useState(product?.variations || []);
  const user = useSelector(selectLoggedInUser);
  const [isNewBrand, setNewBrand] = useState(false);
  const [error, setError] = useState({});
  const [brand, setBrand] = useState(product?.brand?.id);
  const [category, setCategory] = useState(product?.category);
  const navigate = useNavigate();
  const [variationOpen, setVariationOpen] = useState(false);
  const [variationAttributes, setVariationAttributes] = useState(() => {
    if (!product) return [];
    const attKeys = Object.keys(product?.variations[0].customAttributes);
    if (!attKeys) return [];

    return attKeys;
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      title: product?.title,
      price: product?.mrp,
      discountPrice: product?.discountPrice,
    },
  });

  const descRef = useRef();
  const newBrandRef = useRef();

  async function onSubmit(e) {
    let err = {};
    if (variations?.length < 1) {
      err.variation = true;
    }

    if (!category) {
      err.category = "PLease select category";
    }

    if (!brand) {
      err.brand = "PLease select brand";
    }

    if (err.category || err.brand || err.variation) {
      setError(err);
      return;
    }

    setLoading(true);
    const newBrand = newBrandRef.current?.value;

    if (!user.email) return;
    const productData = {
      email: user.email,
      title: e.title,
      description: descRef.current.value,
      mrp: e.price,
      category,
      brand: newBrand?.length > 0 ? { newBrand } : { id: brand },
      discountPrice: e.discountPrice,
      variations: variations.map((vari) => ({
        id: vari.id,
        price: vari.price,
        stock: vari.stock,
        customAttributes: vari.customAttributes,
        images: vari.images,
        specifications: vari.specification,
      })),
    };

    if (product) {
      updateProduct({ id: product.id, ...productData })
        .catch((err) => {
          console.log("PRODUCT FORM", err);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
          setError({});
        });
    } else {
      crateNewProduct(productData)
        .then(() => {
          setLoading(false);
          setError({});
        })
        .catch((error) => {
          console.log("PRODUCT FORM", error);
        })
        .finally(() => {
          navigate("/admin/products");
        });
    }
  }

  return (
    <div className="mx-auto my-6 border p-6 rounded-md">
      <Heading title={product ? "Update Product" : "Create Product"} />
      <form className="mt-4 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col ">
          <Input
            name="title"
            register={register}
            label="Title"
            errors={errors}
            className="px-2 py-1 mt-2 border rounded-sm focus:outline-none border-[#eee]"
            required="Title is required"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="description" className=" font-bold text-xl">
            Description
          </label>
          <textarea
            type="text"
            name="desc"
            id="description"
            ref={descRef}
            required
            defaultValue={product?.description}
            className="px-2 py-1 mt-2 border rounded-sm focus:outline-none border-[#eee]"
          />
        </div>

        <div className="lg:flex gap-4">
          <div className="flex flex-col ">
            <Input
              register={register}
              errors={errors}
              className="px-2 py-1 mt-2 border rounded-sm flex-wrap focus:outline-none border-[#eee] "
              type="number"
              name="price"
              label="Price"
              required="Price is required"
            />
          </div>

          <div className="flex flex-col ">
            <Input
              register={register}
              errors={errors}
              className="px-2 py-1 mt-2 border rounded-sm flex-wrap focus:outline-none border-[#eee] "
              type="number"
              name="discountPrice"
              label="Discount Price"
              required="Discount price is required"
            />
          </div>
        </div>

        <div className="lg:flex gap-8">
          <div className="w-[15rem] max-lg:mb-4 font-semibold space-y-2">
            <label htmlFor="category" className=" font-bold text-xl">
              Category
            </label>
            <Select
              name="category"
              required
              onValueChange={(v) => setCategory(v)}
              defaultValue={product?.category}
            >
              <SelectTrigger>
                <SelectValue
                  className="font-semibold"
                  placeholder={"Select a category"}
                  defaultValue={product?.category}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CATEGORIES.map((category) => (
                    <SelectItem
                      key={category.title}
                      className="font-semibold"
                      value={category.title}
                    >
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* brand */}
          <div className="space-y-2">
            <label htmlFor="category" className=" font-bold text-xl">
              Brand
            </label>
            <div className="font-semibold flex gap-4">
              <div className="w-[12rem]">
                <Select
                  required
                  defaultValue={product?.brand.id}
                  name="brand"
                  onValueChange={(value) => {
                    if (value === "new") {
                      setNewBrand(true);
                    } else {
                      setBrand(value);
                      setNewBrand(false);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      className="font-semibold"
                      placeholder="Select a Brand"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className=" max-h-[10rem] lg:max-h-[15rem] overflow-auto">
                      <SelectItem className="font-semibold" value="new">
                        Create new brand
                      </SelectItem>
                      {brands.map((brand) => (
                        <SelectItem
                          key={brand.id}
                          className="font-semibold"
                          value={brand.id}
                        >
                          {brand.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {isNewBrand && (
                <input
                  type="text"
                  className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
                  placeholder="Brand name"
                  name="new Brand"
                  ref={newBrandRef}
                />
              )}
            </div>
          </div>
        </div>

        {/* Variations */}
        <div>
          <p className=" font-semibold text-xl mb-3">Variations</p>
          {variations && variations.length > 0 && (
            <VariationList
              variations={variations}
              setVariations={setVariations}
              variationAttributes={variationAttributes}
              setVariationAttributes={setVariationAttributes}
            />
          )}
          {!variationOpen && (
            <Button
              type="button"
              className="mt-4"
              onClick={() => setVariationOpen(true)}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          )}
          {variationOpen && (
            <VariationModal>
              <VartationForm
                setVariationOpen={setVariationOpen}
                setVariations={setVariations}
                variations={variations}
                variationAttributes={variationAttributes}
                setVariationAttributes={setVariationAttributes}
              />
            </VariationModal>
          )}

          {error.variation && variations.length == 0 && (
            <p className="text-red-500 font-semibold mt-4">
              Please create atleast one variation.
            </p>
          )}
        </div>
        <p className="font-bold">
          Note: The changes only reflected after save or create.
        </p>
        <div className="flex gap-4 w-full justify-between lg:justify-end ml-auto">
          <Link to="/admin/products">
            <Button className="bg-red-500 font-bold px-6" disabled={isLoading}>
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="font-semibold hover:bg-black/80 px-6 disabled:bg-black/60"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-x-1 justify-center">
                <Loader2 className="h-4 animate-spin" />
                <span className="font-semibold">
                  {product ? "Saving.." : "Creating..."}
                </span>
              </div>
            ) : product ? (
              "Save"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

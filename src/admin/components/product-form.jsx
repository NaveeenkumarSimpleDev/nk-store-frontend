import { CATEGORIES } from "../../config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useEffect, useState } from "react";
import Button from "../../components/ui/button";
import { PlusIcon } from "lucide-react";
import VartationForm from "./variations-form";
import VariationsTable from "./variations-table";
import { crateNewProduct, updateProduct } from "../../feautures/admin/adminApi";
import { useSelector } from "react-redux";
import { selectBrands } from "../../feautures/product/productSlice";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";
import Heading from "../../components/ui/heading";
import VariationModal from "./variation-modal";

const ProductForm = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const brands = useSelector(selectBrands);
  const [variations, setVariations] = useState(product?.variations);
  const user = useSelector(selectLoggedInUser);
  const [isNewBrand, setNewBrand] = useState(false);
  const [variationOpen, setVariationOpen] = useState(false);
  const [variationAttributes, setVariationAttributes] = useState(() => {
    if (!product) return [];
    const attKeys = Object.keys(product?.variations[0].customAttributes);
    if (!attKeys) return [];

    return attKeys;
  });

  console.log({ brands });
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const desc = formData.get("desc");
    const discountPrice = formData.get("discountPrice");
    const mrp = formData.get("price");
    const category = formData.get("category");
    const brand = formData.get("brand");
    const newBrand = formData.get("new Brand");

    if (!user.email) return;
    const productData = {
      email: user.email,
      title: title,
      description: desc,
      mrp,
      category,
      brand: newBrand ? { newBrand } : { id: brand },
      discountPrice,
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
      updateProduct({ id: product.id, ...productData }).finally(() => {
        setLoading(false);
      });
    } else {
      crateNewProduct(productData).finally(() => {
        setLoading(false);
      });
    }
  }

  return (
    <div>
      <Heading title="Create Product" />
      <form action="" className="mt-4 space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label htmlFor="title" className=" font-semibold text-xl">
            Title
          </label>
          <input
            type="text"
            className="px-2 py-1 mt-2 border rounded-sm focus:outline-none border-[#eee]"
            name="title"
            id="title"
            required
            defaultValue={product?.title}
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="description" className=" font-semibold text-xl">
            Description
          </label>
          <textarea
            type="text"
            className="px-2 py-1 mt-2 border rounded-sm flex-wrap focus:outline-none border-[#eee] "
            name="desc"
            id="description"
            required
            defaultValue={product?.description}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col ">
            <label htmlFor="price" className=" font-semibold text-xl">
              Price (MRP)
            </label>
            <input
              type="number"
              className="px-2 py-1 mt-2 border rounded-sm focus:outline-none border-[#eee]"
              name="price"
              id="price"
              min={1}
              required
              defaultValue={product?.mrp}
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="discountPrice" className=" font-semibold text-xl">
              Discount Price
            </label>
            <input
              type="number"
              className="px-2 py-1 mt-2 border rounded-sm focus:outline-none border-[#eee]"
              name="discountPrice"
              id="discountPrice"
              min={1}
              required
              defaultValue={product?.discountPrice}
            />
          </div>
        </div>

        <div className="lg:flex gap-8">
          <div className="w-[10rem] font-semibold space-y-2">
            <label htmlFor="category" className=" font-semibold text-xl">
              Category
            </label>
            <Select name="category" required defaultValue={product?.category}>
              <SelectTrigger>
                <SelectValue
                  className="font-semibold"
                  placeholder={"Select a category"}
                  defaultValue={product?.category.toLowerCase()}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CATEGORIES.map((category) => (
                    <SelectItem
                      key={category.id}
                      className="font-semibold"
                      value={category.value}
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* brand */}
          <div className="space-y-2">
            <label htmlFor="category" className=" font-semibold text-xl">
              Brand
            </label>
            <div className="font-semibold flex gap-4">
              <div className="w-[12rem]">
                <Select
                  required
                  defaultValue={product?.brand?.value}
                  name="brand"
                  onValueChange={(value) => {
                    if (value === "new") {
                      setNewBrand(true);
                    } else {
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
                    <SelectGroup>
                      {brands.map((brand) => (
                        <SelectItem
                          key={brand.id}
                          className="font-semibold"
                          value={brand.id}
                        >
                          {brand.value}
                        </SelectItem>
                      ))}
                      <SelectItem className="font-semibold" value="new">
                        Create new brand
                      </SelectItem>
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
                />
              )}
            </div>
          </div>
        </div>

        {/* Variations */}
        <div>
          <p className=" font-semibold text-xl mb-3">Variations</p>
          {variations && variations.length > 0 && (
            <VariationsTable
              variations={variations}
              setVariations={setVariations}
              variationAttributes={variationAttributes}
              setVariationAttributes={setVariationAttributes}
            />
          )}
          {!variationOpen && (
            <Button
              type="button"
              className="my-4"
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
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ProductForm;

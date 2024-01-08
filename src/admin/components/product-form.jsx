import { BRANDS, CATEGORIES } from "../../config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Button from "../../components/ui/button";
import { PlusIcon } from "lucide-react";

const ProductForm = () => {
  const [isNewBrand, setNewBrand] = useState(false);
  const [variationOpen, setVariationOpen] = useState(false);
  return (
    <div>
      <form action="">
        <div className="flex flex-col ">
          <label htmlFor="title" className=" font-bold text-xl">
            Title
          </label>
          <input
            type="text"
            className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
            name="title"
            id="title"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="description" className=" font-bold text-xl">
            Description
          </label>
          <input
            type="text"
            className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
            name="description"
            id="description"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col ">
            <label htmlFor="price" className=" font-bold text-xl">
              Price (MRP)
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
              name="price"
              id="price"
              min={1}
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="discountPrice" className=" font-bold text-xl">
              Discount Price
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
              name="discountPrice"
              id="discountPrice"
              min={1}
            />
          </div>
        </div>
        <div className="w-[10rem] font-semibold space-y-2">
          <label htmlFor="category" className=" font-bold text-xl">
            Category
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue
                className="font-semibold"
                placeholder="Select a category"
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
          <label htmlFor="category" className=" font-bold text-xl">
            Brand
          </label>
          <div className="font-semibold flex gap-4">
            <div className="w-[12rem]">
              <Select
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
                    {BRANDS.map((brand) => (
                      <SelectItem
                        key={brand.id}
                        className="font-semibold"
                        value={brand.value}
                      >
                        {brand.label}
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
              />
            )}
          </div>
        </div>

        {/* Variations */}
        <div>
          <p className=" font-bold text-xl">Variations</p>
          {!variationOpen && (
            <Button type="button" onClick={() => setVariationOpen(true)}>
              <PlusIcon className="h-4 w-4" />
            </Button>
          )}
          {variationOpen && (
            <>
              <div className="space-y-4">
                <p>Custom Attributes</p>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <CreatableSelect
                    isClearable
                    options={[{ value: "test", label: "test" }]}
                  />
                  <input
                    type="text"
                    className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
                    placeholder="Value"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <CreatableSelect
                    isClearable
                    options={[{ value: "test", label: "test" }]}
                  />
                  <input
                    type="text"
                    className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
                    placeholder="Value"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <CreatableSelect
                    isClearable
                    options={[{ value: "test", label: "test" }]}
                  />
                  <input
                    type="text"
                    className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
                    placeholder="Value"
                  />
                </div>
                <p>
                  Required : Please select at least one attribute for this
                  product
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col ">
                  <label htmlFor="var-price" className=" font-bold text-xl">
                    Price
                  </label>
                  <input
                    type="number"
                    className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
                    name="var-price"
                    id="var-price"
                    min={1}
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="stock" className=" font-bold text-xl">
                    Stock
                  </label>
                  <input
                    type="number"
                    className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
                    name="stock"
                    id="stock"
                    min={1}
                  />
                </div>
              </div>

              <div className="flex flex-col ">
                <label htmlFor="specs" className=" font-bold text-xl">
                  Specifications
                </label>
                <input
                  type="text"
                  className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
                  name="specs"
                  id="specs"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="images" className=" font-bold text-xl">
                  Images
                </label>
                <input
                  type="file"
                  className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
                  name="images"
                  id="images"
                  multiple
                />
              </div>
              <div>
                <Button type="button" onClick={() => setVariationOpen(false)}>
                  Save
                </Button>
                <Button type="button" onClick={() => setVariationOpen(false)}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

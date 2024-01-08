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
import Button from "../../components/ui/button";
import { PlusIcon } from "lucide-react";
import VartationForm from "./variations-form";

const ProductForm = () => {
  const [isNewBrand, setNewBrand] = useState(false);
  const [variations, setVariations] = useState([]);
  const [variationOpen, setVariationOpen] = useState(false);

  console.log({ variations });
  return (
    <div>
      <form action="" onSubmit={(e) => e.preventDefault()}>
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
          div
          
          {!variationOpen && (
            <Button type="button" onClick={() => setVariationOpen(true)}>
              <PlusIcon className="h-4 w-4" />
            </Button>
          )}
          {variationOpen && (
            <VartationForm
              setVariationOpen={setVariationOpen}
              setVariations={setVariations}
            />
          )}
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default ProductForm;

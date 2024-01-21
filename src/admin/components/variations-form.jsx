import React, { useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import Button from "../../components/ui/button";
import { useRef, useState } from "react";
import { cn } from "../../lib/utils";

const VartationForm = ({ setVariationOpen, setVariations, variation }) => {
  const [attribute1, setAttribute1] = useState();
  const [attribute2, setAttribute2] = useState();
  const [attribute3, setAttribute3] = useState();
  const [error, setError] = useState({});
  const [customDeafault, setCustmoDefault] = useState([]);
  const attribute1ref = useRef();
  const attribute2ref = useRef();
  const attribute3ref = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  const specRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    if (!variation) return;

    let customValues = [];
    Object.keys(variation?.customAtributes).forEach((key) => {
      key != "undefined" &&
        customValues.push({
          label: key,
          value: variation.customAtributes[key],
        });
    });

    setCustmoDefault(customValues);
  }, []);

  console.log(customDeafault);
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!attribute1ref.current.value || !attribute1) {
      errors.attribute = true;
    }

    if (!priceRef.current.value && priceRef.current.value == "") {
      errors.price = true;
    }
    if (!stockRef.current.value) {
      errors.stock = true;
    }

    if (imageRef.current.files.length === 0) {
      errors.images = "Please select at least one image";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setVariations((prev) => [
      ...prev,
      {
        id: new Date().getTime() + "" + Math.random(),
        customAtributes: {
          [attribute1]: attribute1ref.current.value,
          [attribute2]: attribute2ref.current.value,
          [attribute3]: attribute3ref.current.value,
        },
        price: priceRef.current.value,
        stock: stockRef.current.value,
        specs: specRef.current.value,
        images: [
          imageRef.current.files[0],
          imageRef.current.files[1],
          imageRef.current.files[2],
        ],
      },
    ]);
    setAttribute1("");
    setAttribute2("");
    setAttribute3("");
    priceRef.current.value = "";
    stockRef.current.value = "";
    specRef.current.value = "";
    imageRef.current.value = "";
    setError({});
    setVariationOpen((prev) => !prev);
  };

  return (
    <form>
      <div className="space-y-4">
        <p>Custom Attributes</p>
        <div className="grid grid-cols-2 gap-4 w-full">
          <CreatableSelect
            isClearable
            options={[{ value: "test", label: "test" }]}
            onChange={(value) => {
              setAttribute1(value.value);
            }}
            required
            defaultInputValue={customDeafault[0]}
          />
          <input
            type="text"
            className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
            placeholder="Value"
            ref={attribute1ref}
            required
            value={customDeafault[0]?.value}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <CreatableSelect
            isClearable
            options={[{ value: "test", label: "test" }]}
            onChange={(value) => {
              setAttribute2(value.value);
            }}
            defaultValue={customDeafault[0]}
          />
          <input
            type="text"
            className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
            placeholder="Value"
            ref={attribute2ref}
            value={customDeafault[1]?.value}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <CreatableSelect
            isClearable
            options={[{ value: "test", label: "test" }]}
            onChange={(value) => {
              setAttribute3(value.value);
            }}
          />
          <input
            type="text"
            className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
            placeholder="Value"
            ref={attribute3ref}
            value={customDeafault[2]?.value}
          />
        </div>

        <p className={cn("", error.attribute ? "text-red-500" : "text-black")}>
          Required : Please select at least one attribute for this product{" "}
          <span className="font-bold"> EX: COLOR : RED, SIZE:XL</span>
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
            ref={priceRef}
            required
            defaultValue={variation?.price}
          />
          {error.price && (
            <span className="text-red-500">
              Required,please enter a valid price{" "}
            </span>
          )}
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
            ref={stockRef}
            required
            defaultValue={variation?.stock}
          />
          {error.stock && (
            <span className="text-red-500">
              Required,please enter a valid number{" "}
            </span>
          )}
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
          ref={specRef}
          defaultValue={variation?.specs}
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
          ref={imageRef}
          required
        />
        <p>Note: Only 3 images are allowed.</p>
        {error.images && <span className="text-red-500">{error.images}</span>}
      </div>
      <div>
        <Button onClick={handleSubmit}>Save</Button>
        <Button type="button" onClick={() => setVariationOpen((prev) => !prev)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default React.memo(VartationForm);

import React, { useEffect } from "react";
import Button from "../../components/ui/button";
import { useRef, useState } from "react";
import { cn } from "../../lib/utils";

const VartationForm = ({
  setVariationOpen,
  setVariations,
  variation,
  type,
  variations,
  variationAttributes,
  setVariationAttributes,
}) => {
  const [attributes, setAttributes] = useState([]);
  const [error, setError] = useState({});
  const priceRef = useRef();
  const stockRef = useRef();
  const specRef = useRef();
  const imageRef = useRef();
  const valuesRefs = [useRef(), useRef(), useRef()];
  const newValuesRefs = [useRef(), useRef(), useRef()];

  const handleAttributeChange = (idx, value) => {
    setAttributes((prevAttributes) => {
      const newAttributes = [...prevAttributes];
      newAttributes[idx].att = value;
      return newAttributes;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (
      attributes[0].att.length < 1 ||
      valuesRefs[0].current?.value?.length < 1
    ) {
      errors.attribute = true;
    }

    if (
      attributes[0].att == "Create new" &&
      newValuesRefs[0].current?.value?.length < 1
    ) {
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

    const customAttributes = {
      [newValuesRefs[0].current?.value || attributes[0].att]:
        valuesRefs[0].current?.value,
      [newValuesRefs[1].current?.value || attributes[1].att]:
        valuesRefs[1].current?.value,
      [newValuesRefs[2].current?.value || attributes[2].att]:
        valuesRefs[2].current?.value,
    };

    const cleanedObject = Object.fromEntries(
      Object.entries(customAttributes).filter(
        ([key, value]) => key !== "" && value !== undefined
      )
    );

    console.log("inside su");
    // attributes
    if (!variationAttributes || variationAttributes.length < 0) {
      console.log("inside");
      const att = Object.keys(cleanedObject);
      setVariationAttributes(att);
      console.log(att, "keys");
    }

    setVariations((prev) => {
      const dpArr = prev?.filter((x) => x.id !== variation?.id) || [];
      return [
        ...dpArr,
        {
          id: new Date().getTime() + "" + Math.random(),
          customAttributes: cleanedObject,
          price: priceRef.current.value,
          stock: stockRef.current.value,
          specification: specRef.current.value,
          images: [
            imageRef.current.files[0],
            imageRef.current.files[1],
            imageRef.current.files[2],
          ],
        },
      ];
    });
    priceRef.current.value = "";
    stockRef.current.value = "";
    specRef.current.value = "";
    imageRef.current.value = "";
    setError({});
    setVariationOpen((prev) => !prev);
  };

  useEffect(() => {
    // if (!variations[0]) return;

    if (type == "edit" && variations[0] && variations[0].id == variation.id) {
      let customValues = [];
      let att = [
        { att: "", defaultVal: "" },
        { att: "", defaultVal: "" },
        { att: "", defaultVal: "" },
      ];

      Object.keys(variation.customAttributes).forEach((key, idx) => {
        key != "undefined" &&
          customValues.push({
            label: key,
            value: variation.customAttributes[key],
          });

        att[idx].att = key;

        att[idx].defaultVal = variation.customAttributes[key];
      });
      setAttributes(att);
    } else if (variationAttributes.length > 0) {
      let attribute = [];
      variationAttributes.forEach((v) => {
        attribute.push({ att: v, defaultVal: variation.customAttributes[v] });
      });
      setAttributes(attribute);
      console.log(attribute);
    } else {
      setAttributes([
        { att: "", defaultVal: "" },
        { att: "", defaultVal: "" },
        { att: "", defaultVal: "" },
      ]);
    }
  }, []);

  console.log({ variationAttributes });

  if (attributes.length < 1) return <p>Loading....</p>;

  const opt = ["Select", "sldmsmdms", "Create new"];
  return (
    <form>
      <div className="space-y-4">
        <p>Custom Attributes</p>
        {/* attributes */}
        {attributes.map((_, index) => (
          <div
            key={index + "" + index + 1}
            className="grid grid-cols-2 gap-4 w-full"
          >
            <div className="flex">
              {variationAttributes?.length < 1 ? (
                <select
                  key={opt + "" + index}
                  name="attribute1"
                  onChange={(e) => handleAttributeChange(index, e.target.value)}
                >
                  {opt.map((opt, idx) => (
                    <option
                      key={opt + "" + idx}
                      value={opt}
                      selected={
                        opt === attributes[index]?.att && opt != "Create new"
                      }
                    >
                      {opt}
                    </option>
                  ))}

                  {attributes[index].att.length > 0 &&
                    !opt.includes(attributes[index].att) && (
                      <option attue={attributes[index].att} selected>
                        {attributes[index].att}
                      </option>
                    )}
                </select>
              ) : (
                <p>{attributes[index]?.att}</p>
              )}

              {attributes[index].att === "Create new" && (
                <input
                  ref={newValuesRefs[index]}
                  type="text"
                  placeholder="Enter new"
                  className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
                />
              )}
            </div>
            <input
              type="text"
              className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
              placeholder="Value"
              required
              ref={valuesRefs[index]}
              defaultValue={attributes[index].defaultVal}
            />
          </div>
        ))}
        {/*  */}

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

export default VartationForm;

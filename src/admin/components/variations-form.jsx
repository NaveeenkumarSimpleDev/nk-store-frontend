import React, { useEffect } from "react";
import Button from "../../components/ui/button";
import { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { upLoadImage } from "../../feautures/admin/adminApi";
import { ATTRIBUTE_OPTIONS } from "../../config";
import { useForm } from "react-hook-form";
import Input from "./input";
import { Loader2 } from "lucide-react";

const VartationForm = ({
  setVariationOpen,
  setVariations,
  variation,
  variations = [],
  variationAttributes,
  setVariationAttributes,
}) => {
  const [attributes, setAttributes] = useState([]);
  const [error, setError] = useState({});
  const valuesRefs = [useRef(), useRef(), useRef()];
  const newValuesRefs = [useRef(), useRef(), useRef()];
  const isFirstVariation = variations[0] && variations.length === 1;

  const handleAttributeChange = (idx, value) => {
    setAttributes((prevAttributes) => {
      const newAttributes = [...prevAttributes];
      newAttributes[idx].att = value;
      return newAttributes;
    });
  };

  const {
    handleSubmit: formSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      price: variation?.price,
      specs: variation?.specification,
      stock: variation?.stock,
    },
  });

  const handleSubmit = async (e) => {
    let errors = {};

    if (!variations) {
      if (attributes[0].att?.length < 1 || valuesRefs[0].current?.length < 1)
        errors.attribute = "Please select atleast one attributes";
    }

    if (variations.length > 0) {
      let error = false;
      attributes.forEach((x, idx) => {
        if (x.att.length < 1) error = true;
        if (valuesRefs[idx].current?.value?.length < 1) error = true;
      });

      if (error) {
        errors.attribute = "Please enter all values";
      }
    } else {
      if (
        attributes[0].att == "Create new" &&
        newValuesRefs[0].current?.value?.length < 1
      ) {
        errors.attribute = "Please enter values";
      }
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const images =
      (await upLoadImage(e.images, variation?.images)) || variation?.images;

    if (!images) {
      setError({ images: "Something wrong!, pls try again " });
      return;
    }

    const customAttributes = {
      [newValuesRefs[0].current?.value || attributes[0].att]:
        valuesRefs[0].current?.value,
      [newValuesRefs[1].current?.value || attributes[1]?.att]:
        valuesRefs[1].current?.value,
      [newValuesRefs[2].current?.value || attributes[2]?.att]:
        valuesRefs[2].current?.value,
    };

    const cleanedObject = Object.fromEntries(
      Object.entries(customAttributes).filter(
        ([key, value]) => key !== "" && value !== undefined
      )
    );

    setVariations((prev) => {
      const dpArr =
        prev?.filter((x) => {
          if (x.id !== variation?.id) return x;

          if (x.idRef !== variation?.idRef) return x;
        }) || [];
      const newVari = {
        id: variation?.id,
        idRef: Math.random() * 2121 * Math.random(),
        customAttributes: cleanedObject,
        price: e.price,
        stock: e.stock,
        specification: e.specs,
        images,
      };
      return isFirstVariation ? [newVari, ...dpArr] : [...dpArr, newVari];
    });

    if (!variationAttributes || variationAttributes.length < 1) {
      const keys = Object.keys(cleanedObject);
      setVariationAttributes(keys);
    }

    setError({});
    reset();
    setVariationOpen((prev) => !prev);
  };

  useEffect(() => {
    if (variation) {
      let attribute = [];
      variationAttributes.forEach((v) => {
        attribute.push({
          att: v,
          defaultVal: variation.customAttributes[v],
        });
      });

      setAttributes(attribute);
      return;
    }

    if (variationAttributes.length > 0) {
      let attribute = [];
      variationAttributes.forEach((v) => {
        attribute.push({
          att: v,
          defaultVal: "",
        });
      });

      setAttributes(attribute);
      return;
    } else {
      setAttributes([
        { att: "", defaultVal: "" },
        { att: "", defaultVal: "" },
        { att: "", defaultVal: "" },
      ]);
    }
  }, []);

  return (
    <form className="px-4 py-2">
      <p className="font-bold text-2xl my-2">Variation</p>
      <div className="space-y-4">
        <p className="font-semibold">Custom Attributes</p>
        {!variations[0] && (
          <p className="font-semibold">
            Note : please selecrt custom attributes
            <p className="font-bold text-green-600">
              EX : Color : red, Size : 30
            </p>
          </p>
        )}

        {/* attributes */}
        {attributes.map((_, index) => (
          <div
            key={index + "" + index + 1}
            className="grid grid-cols-2 gap-4 w-full"
          >
            <div className="flex">
              {variationAttributes.length == 0 ? (
                // customAttributes change option not available now.

                <div className="border rounded-lg px-2 flex items-center justify-center">
                  <select
                    key={index + "" + index}
                    name={"attributes" + index}
                    onChange={(e) =>
                      handleAttributeChange(index, e.target.value)
                    }
                    className="outline-none focus:outline-none p-2"
                  >
                    {ATTRIBUTE_OPTIONS.map((opt, idx) => (
                      <option
                        className="cursor-pointer"
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
                      !ATTRIBUTE_OPTIONS.includes(attributes[index].att) && (
                        <option attue={attributes[index].att} selected>
                          {attributes[index].att}
                        </option>
                      )}
                  </select>
                </div>
              ) : (
                <p className="font-semibold text-lg">
                  {attributes[index]?.att}
                </p>
              )}

              {attributes[index].att === "Create new" && (
                <input
                  ref={newValuesRefs[index]}
                  type="text"
                  placeholder="Enter Attribute"
                  className="px-2 py-1 ml-4 border rounded-sm focus:outline-none border-[#eee]"
                />
              )}
            </div>
            <input
              type={
                attributes[index].att == ("Color" || "color") ? "color" : "text"
              }
              className={cn(
                "px-2 py-1 border rounded-sm focus:outline-none border-[#eee]",
                attributes[index].att == ("Color" || "color") && "h-[2.5rem]"
              )}
              placeholder="Value"
              required={index === 1}
              ref={valuesRefs[index]}
              defaultValue={attributes[index].defaultVal}
            />
          </div>
        ))}
        {error.attribute && (
          <p
            className={cn("", error.attribute ? "text-red-500" : "text-black")}
          >
            {error.attribute}
          </p>
        )}
        {!variations[0] && (
          <p className="font-semibold">
            Please select carefully, once the variation saved can't change
            attribute name
          </p>
        )}
      </div>

      <div className="flex gap-4 my-4">
        <div className="flex flex-col ">
          <Input
            register={register}
            type="number"
            name="price"
            label="Price"
            required="Price is required"
            className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
            errors={errors}
          />
        </div>
        <div className="flex flex-col ">
          <Input
            register={register}
            name="stock"
            type="number"
            label="Stock"
            required="Stock is required"
            className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
            errors={errors}
          />
        </div>
      </div>

      <div className="flex flex-col ">
        <Input
          register={register}
          name="specs"
          label="Specs"
          className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
          errors={errors}
        />
      </div>

      <div className="flex flex-col py-4">
        {variation && (
          <div className="flex gap-3 my-3">
            {variation.images.map((img) => (
              <img
                src={img}
                alt="variation img"
                className="h-[5rem] w-[5rem] object-contain object-center"
              />
            ))}
          </div>
        )}

        <Input
          register={register}
          name="images"
          label="Images"
          required={variation ? false : "Images is required"}
          className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
          errors={errors}
          type="file"
        />

        <p>Note: Only 3 images are allowed.</p>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          className=" bg-red-400 text-white font-semibold"
          onClick={() => setVariationOpen((prev) => !prev)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          className="px-6 hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/60"
          onClick={formSubmit(handleSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-x-1 justify-center">
              <Loader2 className="h-4 animate-spin" />
              <span className="font-semibold">Saving..</span>
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  );
};

export default VartationForm;

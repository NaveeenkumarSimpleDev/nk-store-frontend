import React from "react";
import { cn, formatPrice } from "../../lib/utils";
import Button from "../../components/ui/button";
import { Trash2 } from "lucide-react";

const VariationCard = ({
  variation,
  setEditing,
  setVariations,
  setVariationAttributes,
}) => {
  return (
    <div className="grid w-[12rem] md:w-[15rem] border rounded-md shrink-0">
      <div className="relative">
        <img
          className="rounded-lg h-[10rem] md:h-[15rem] w-full object-cover object-center relative"
          src={variation.images[0]}
          alt="variation img"
        />
        <Button
          type="button"
          onClick={() => {
            const confirm = window.confirm(
              "Are you sure you want to delete this Variation?"
            );
            if (confirm) {
              setVariations((prev) => {
                if (prev?.length === 1) setVariationAttributes([]);
                return prev.filter(
                  (v) => v.id !== variation.id || v.idRef !== variation?.idRef
                );
              });
            }
          }}
          className="absolute hover:scale-110 transition duration-200  bg-red-500 top-2 right-2 p-1.5 rounded-full"
        >
          <Trash2 />
        </Button>
      </div>
      <div className="p-2 space-y-1 border-t">
        <div>
          {Object.keys(variation.customAttributes).map((k, idx) => (
            <div className="flex justify-between" key={idx}>
              <p className="font-semibold">{k}</p>
              {k.toLocaleLowerCase() == "color" ? (
                <div
                  className={cn("h-6 w-6 rounded-md border border-black")}
                  style={{ background: variation.customAttributes[k] }}
                />
              ) : (
                <p>{variation.customAttributes[k]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <p className="font-semibold">Price</p>
          <p>{formatPrice(variation.price)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Stock</p>
          <p>{variation.stock}</p>
        </div>

        <div className="flex justify-between max-lg:text-sm">
          <p className="font-semibold">Specifications</p>
          <p className="font-bold">....</p>
        </div>

        <div className="flex justify-between gap-3">
          <Button
            className="bg-white text-black font-semibold border py-1 w-full"
            type="button"
          >
            View
          </Button>
          <Button
            className="w-full py-1 bg-black/90 font-semibold"
            type="button"
            onClick={() => setEditing(variation)}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VariationCard;

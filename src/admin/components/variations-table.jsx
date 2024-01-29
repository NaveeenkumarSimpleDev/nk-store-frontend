import React, { useEffect, useState } from "react";
import VariationItem from "./vairation-item";
import VartationForm from "./variations-form";
import VariationModal from "./variation-modal";

const VariationTable = ({
  variations,
  setVariations,
  variationAttributes,
  setVariationAttributes,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <table className="table-auto border rounded-md w-full">
        <thead className="font-semibold text-center bg-black/80 text-white ">
          <tr className="p-4 text-lg">
            <th>No</th>
            <th>Attributes</th>
            <th>Price</th>
            <th>Specs</th>
            <th>Stock</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {variations.map((variation, idx) => (
            <VariationItem
              key={idx}
              variation={variation}
              idx={idx}
              setEditing={setEditing}
              setVariationAttributes={setVariationAttributes}
              setVariations={setVariations}
            />
          ))}
        </tbody>
      </table>
      {editing && (
        <VariationModal>
          <VartationForm
            setVariationOpen={setEditing}
            setVariations={setVariations}
            variation={editing}
            variations={variations}
            type="edit"
            variationAttributes={variationAttributes}
            setVariationAttributes={setVariationAttributes}
          />
        </VariationModal>
      )}
    </>
  );
};

export default React.memo(VariationTable);

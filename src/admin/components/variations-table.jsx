import React from "react";
import VariationItem from "./vairation-item";
import VartationForm from "./variations-form";

const VariationTable = ({ variations, setVariations }) => {
  const [editing, setEditing] = React.useState(false);

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
              key={variation.id}
              variation={variation}
              idx={idx}
              setEditing={setEditing}
              setVariations={setVariations}
            />
          ))}
        </tbody>
      </table>
      {editing && (
        <VartationForm
          setVariationOpen={setEditing}
          setVariations={setVariations}
          variation={editing}
        />
      )}
    </>
  );
};

export default React.memo(VariationTable);

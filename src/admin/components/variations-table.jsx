import React from "react";
import VariationItem from "./vairation-item";

const VariationTable = ({ variations }) => {
  return (
    <table className="table-auto border rounded w-full">
      <thead className="font-semibold text-center bg-black/80 text-white ">
        <tr className="p-4 text-lg">
          <th>Attributes</th>
          <th>Price</th>
          <th>Specs</th>
          <th>Stock</th>
          <th>Images</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {variations.map((variation) => (
          <VariationItem key={variation.id} variation={variation} />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(VariationTable);

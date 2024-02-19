import React, { useState } from "react";
import VartationForm from "./variations-form";
import VariationModal from "./variation-modal";
import VariationCard from "./variation-card";

const VariationList = ({
  variations,
  setVariations,
  variationAttributes,
  setVariationAttributes,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className="flex gap-4  overflow-x-auto overflow-auto">
        {variations?.map((v, idx) => (
          <VariationCard
            variation={v}
            setEditing={setEditing}
            key={idx + "" + v.id}
            setVariationAttributes={setVariationAttributes}
            setVariations={setVariations}
          />
        ))}
      </div>
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

export default React.memo(VariationList);

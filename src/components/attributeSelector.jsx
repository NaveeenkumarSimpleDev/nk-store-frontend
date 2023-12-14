// AttributeSelector.jsx
import React from "react";
import RadioButton from "./ui/radio-button";

const AttributeSelector = ({
  attributeType,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div>
      <span className="text-xl font-semibold">{attributeType}</span>
      <div className="mt-3 flex gap-4">
        {options.map((option, idx) => (
          <RadioButton
            key={`${option}${idx}`}
            type={attributeType}
            id={option}
            label={option}
            checked={selectedValue === option}
            onChange={() => onChange(attributeType, option)}
          />
        ))}
      </div>
    </div>
  );
};

export default AttributeSelector;

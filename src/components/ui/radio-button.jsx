import React from "react";
import { cn } from "../../lib/utils";

const RadioButton = ({
  id,
  label,
  type,
  color,
  className,
  checked,
  onChange,
  disabled,
  ...props
}) => {
  return (
    <div className="flex">
      <input
        type="radio"
        checked={checked}
        name={type}
        onChange={onChange}
        className="hidden"
        id={id}
        disabled={disabled}
        {...props}
      />
      <label
        style={{ background: color }}
        htmlFor={id}
        className={cn(
          type === "colors"
            ? "h-6 cursor-pointer w-6 hover:ring-2 transition hover:ring-black ring-offset-1 rounded-full border-2"
            : "text-sm font-semibold px-3 py-1.5 border  rounded-sm cursor-pointer ",
          checked &&
            (type === "colors"
              ? "ring-2 ring-black"
              : "border-black bg-black/90 font-bold text-white"),
          className
        )}
      >
        {type === "size" && label}
      </label>
    </div>
  );
};

export default React.memo(RadioButton);

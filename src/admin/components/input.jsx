import React from "react";
import { cn } from "../../lib/utils";

const Input = ({
  name,
  label,
  rules,
  errors,
  className,
  required,
  register,
  type = "text",
  ...field
}) => {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return (
    <div className="flex flex-col max-sm:gap-1 ">
      <label htmlFor={name} className=" font-bold max-sm:text-sm text-base">
        {label}
      </label>
      <input
        {...field}
        type={type}
        multiple={type === "file"}
        {...register(name, {
          required,
          pattern: {
            value: type === "email" ? emailPattern : undefined,
            message: type === "email" ? "Invalid email address" : undefined,
          },
        })}
        className={cn(
          "px-2 py-1 border rounded-sm focus:outline-none border-slate-200 bg-white/70",
          className
        )}
      />
      {errors && errors[name] && (
        <p className="text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default Input;

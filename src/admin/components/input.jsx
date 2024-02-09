import React from "react";
import { Controller } from "react-hook-form";

const Input = ({
  name,
  label,
  control,
  rules,
  errors,
  className,
  required,
  register,
  type = "text",
}) => {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return (
    <div className="flex flex-col ">
      <label htmlFor={name} className=" font-bold text-xl">
        {label}
      </label>
      <input
        type={type}
        multiple={type === "file"}
        {...register(name, {
          required,
          pattern: {
            value: type === "email" ? emailPattern : undefined,
            message: type === "email" ? "Invalid email address" : undefined,
          },
        })}
        className={className}
      />
      {errors && errors[name] && (
        <p className="text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default Input;

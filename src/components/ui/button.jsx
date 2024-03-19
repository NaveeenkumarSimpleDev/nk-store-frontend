import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  (
    {
      children,
      isLoading,
      disabled,
      onClick,
      type = "button",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        onClick={onClick}
        type={type}
        disabled={disabled || isLoading}
        ref={ref} // This attaches the ref to the button element
        className={cn(
          "px-4 bg-black disabled:cursor-not-allowed py-2 text-white rounded-md hover:opacity-90 relative",
          className
        )}
        {...props}
      >
        <span className="z-10">{children}</span>
      </button>
    );
  }
);

export default Button;

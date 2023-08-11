import React from "react";
import { cn } from "../../lib/utils";

const Button = ({
  children,
  isLoading,
  disabled,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "px-4 bg-black disabled:cursor-not-allowed py-2 text-white rounded-md hover:opacity-90 relative", // Added relative positioning
        className
      )}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-3.647z"
              ></path>
            </svg>
          </svg>
        </span>
      )}
      <span
        className={cn(
          "transition-opacity",
          isLoading ? "opacity-0" : "opacity-100" // Hide content when loading
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;

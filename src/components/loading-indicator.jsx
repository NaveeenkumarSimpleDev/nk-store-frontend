import React from "react";
import { cn } from "../lib/utils";

const LoadingIndigator = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
    </div>
  );
};

export default LoadingIndigator;

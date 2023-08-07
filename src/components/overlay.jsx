import React from "react";
import { cn } from "../lib/utils";

const Overlay = (onClose, className) => {
  return (
    <div
      onClick={onClose}
      className={cn(
        " z-[100] fixed top-0 min-h-screen min-w-full bg-[rgba(0,0,0,0.1)]",
        className
      )}
    />
  );
};

export default React.memo(Overlay);

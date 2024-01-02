import { useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const Model = ({ className, children, backButtonHref }) => {
  return (
    <div>
      {/* backdrop */}
      <div
        onClick={() => {
          return navigate(backButtonHref);
        }}
        className="cursor-default h-screen absolute z-[150] top-0 left-0 right-0 bg-[rgba(0,0,0,0.6)]"
      />
      <div className={cn("absolute inset-0", className)}>{children}</div>
    </div>
  );
};

export default Model;

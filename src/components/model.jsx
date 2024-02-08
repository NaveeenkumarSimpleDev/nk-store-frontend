import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

const Model = ({ className, children, backButtonHref }) => {
  const navigate = useNavigate();
  return (
    <div>
      {/* backdrop */}
      <div
        onClick={() => {
          return navigate(backButtonHref ? backButtonHref : -1);
        }}
        className="cursor-default h-screen fixed z-[150] top-0 left-0 right-0 bg-[rgba(0,0,0,0.6)]"
      />
      <div className={cn("absolute inset-0", className)}>{children}</div>
    </div>
  );
};

export default Model;

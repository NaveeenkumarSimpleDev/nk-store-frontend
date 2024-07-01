import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

const Model = ({ className, children, backButtonHref }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* Background overlay */}
      <div
        onClick={() => {
          if (typeof backButtonHref != "string")
            return backButtonHref((prev) => !prev);
          return navigate(backButtonHref ? backButtonHref : -1);
        }}
        className="fixed inset-0 w-full bg-black/80 z-[150] flex items-center justify-center"
      >
        {/* Background overlay prevents scrolling */}
        <div className="fixed inset-0 overflow-hidden" aria-hidden="true"></div>
      </div>
      {/* Modal content */}
      <div className="fixed top-[50%] left-[50%] z-[151] transform -translate-x-1/2 -translate-y-1/2 rounded-md">
        {/* Modal content with scrollable area */}
        <div className={cn("max-h-[90vh]  overflow-y-auto", className)}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Model;

// <div>
//   backdrop
//   <div
//     onClick={() => {
//       if (backType == "function") return backButtonHref(false);
//       return navigate(backButtonHref ? backButtonHref : -1);
//     }}
//     className="cursor-default h-screen fixed z-[150] top-0 left-0 right-0 bg-[rgba(0,0,0,0.6)]"
//   />
//   <div className={cn("absolute inset-0", className)}>{children}</div>
// </div>

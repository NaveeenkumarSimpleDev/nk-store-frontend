import React from "react";

const VariationModal = ({ children }) => {
  return (
    <div className="lg:fixed inset-0 bg-black/80 z-[150] flex items-center max-lg:max-h-full overflow-y-scroll justify-center">
      <div className="bg-white rounded-md p-4">{children}</div>
    </div>
  );
};

export default VariationModal;

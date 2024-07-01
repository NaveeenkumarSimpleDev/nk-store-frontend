import React from "react";

const VariationModal = ({ children, close }) => {
  return (
    <>
      {/* Background overlay */}
      <div
        onClick={() => close(false)}
        className="fixed inset-0 bg-black/80 z-[150] flex items-center justify-center"
      >
        {/* Background overlay prevents scrolling */}
        <div className="fixed inset-0 overflow-hidden" aria-hidden="true"></div>
      </div>
      {/* Modal content */}
      <div className="fixed top-[50%] left-[50%] z-[151] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">
        {/* Modal content with scrollable area */}
        <div className="max-h-[78vh] w-full h-[min(500px)] bg-white overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default VariationModal;

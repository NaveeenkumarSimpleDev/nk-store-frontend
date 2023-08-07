import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return <Toaster position="top-right" />;
};

export default React.memo(ToasterProvider);

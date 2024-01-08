import { useState } from "react";

const useNewProduct = () => {
  //   const [product, setProduct] = useState({});
  const [variations, setVariations] = useState([]);
  const [variationOpen, setVariationOpen] = useState(false);

  return {
    variations,
    setVariations,
    variationOpen,
    setVariationOpen,
  };
};
export { useNewProduct };

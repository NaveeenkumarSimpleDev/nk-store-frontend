import { useEffect, useState } from "react";
import ProductForm from "../components/product-form";
import { fetchProductById } from "../../feautures/product/productAPI";
import { useParams } from "react-router-dom";

const EdidProduct = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  useEffect(() => {
    fetchProductById(params.editId).then((data) => {
      // console.log(data);
      setProduct(data);
    });
  }, []);

  if (!product) return <p>LOADING....</p>;

  return <ProductForm product={product} />;
};

export default EdidProduct;

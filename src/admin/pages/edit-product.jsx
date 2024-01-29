import { useEffect, useState } from "react";
import ProductForm from "../components/product-form";
import {
  fetchBrands,
  fetchProductById,
} from "../../feautures/product/productAPI";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBrandsAsync } from "../../feautures/product/productSlice";

import LoadingIndigator from "../../components/loading-indicator";

const EdidProduct = () => {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    fetchProductById(params.editId).then((data) => {
      setProduct(data);
    });

    dispatch(fetchBrandsAsync());
  }, []);

  if (!product)
    return (
      <LoadingIndigator className="h-screen fixed inset-0 w-full flex items-center justify-center" />
    );

  return <ProductForm product={product} />;
};

export default EdidProduct;

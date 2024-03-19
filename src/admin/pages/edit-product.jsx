import { useEffect, useState } from "react";
import ProductForm from "../components/product-form";
import {
  fetchBrands,
  fetchProductById,
} from "../../feautures/product/productAPI";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandsAsync } from "../../feautures/product/productSlice";

import LoadingIndigator from "../../components/loading-indicator";
import { selectEditProduct } from "../../feautures/admin/adminSlice";

const EdidProduct = () => {
  const [product, setProduct] = useState(null);
  const editProduct = useSelector(selectEditProduct);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (editProduct) return;

    fetchProductById(params.editId).then((data) => {
      setProduct(data);
    });

    dispatch(fetchBrandsAsync());
  }, []);

  if (!product && !editProduct)
    return (
      <LoadingIndigator className="h-screen fixed inset-0 w-full flex items-center justify-center" />
    );

  return <ProductForm product={product || editProduct} />;
};

export default EdidProduct;

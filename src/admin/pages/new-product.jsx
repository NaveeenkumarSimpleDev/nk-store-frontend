import { useEffect } from "react";
import ProductForm from "../components/product-form";
import { fetchBrandsAsync } from "../../feautures/product/productSlice";
import { useDispatch } from "react-redux";

const AddProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrandsAsync());
  }, []);

  return <ProductForm />;
};

export default AddProduct;

import { useSelector } from "react-redux";
import { selectAllProducts } from "../../feautures/product/productSlice";
import ProductCard from "../components/product-card";
import Heading from "../../components/ui/heading";
import Button from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchAdminProducts } from "../../feautures/admin/adminApi";
const AdminProducts = () => {
  const products = useSelector(selectAllProducts);

  async function fetchProducts() {
    await fetchAdminProducts();
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center-center">
        <Heading title="My Products" desc="Manage your products here" />
        <Button className="font-semibold my-auto bg-blue-500 px-4 py-2 h-fit">
          <Link to="/admin/products/new-product">Add Product</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {products?.map((product, idx) => (
          <ProductCard key={product?.id + "_" + idx} product={product} />
        ))}
      </div>
    </section>
  );
};
export default AdminProducts;

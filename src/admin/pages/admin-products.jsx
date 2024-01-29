import { useSelector } from "react-redux";

import ProductCard from "../components/product-card";
import Heading from "../../components/ui/heading";
import Button from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdminProducts } from "../../feautures/admin/adminApi";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";
import ProductLoading from "../../components/product-loading";
const AdminProducts = () => {
  const user = useSelector(selectLoggedInUser);
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    setLoading(true);
    if (!user.email) return;
    await fetchAdminProducts(user.email)
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchProducts();
  }, [user]);

  return (
    <section className="flex flex-col gap-6 w-full">
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
        {products?.length === 0 && !loading && (
          <p>Products not found, pls create products</p>
        )}
      </div>
      {loading && <ProductLoading />}
    </section>
  );
};
export default AdminProducts;

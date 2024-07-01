import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../components/product-card";
import Heading from "../../components/ui/heading";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdminProductsAsync } from "../../feautures/admin/adminSlice";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";
import ProductLoading from "../../components/product-loading";
import { selectAdminProducts } from "../../feautures/admin/adminSlice";
import { fetchCartByUserIdAsync } from "../../feautures/cart/cartSlice";
const AdminProducts = () => {
  const user = useSelector(selectLoggedInUser);
  const products = useSelector(selectAdminProducts);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function fetchProducts() {
    if (!user.email) return;
    if (!products) {
      setLoading(true);
    }
    await dispatch(fetchAdminProductsAsync(user.email));
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
    dispatch(fetchCartByUserIdAsync(user?.id));
  }, []);

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center-center">
        <Heading title="My Products" desc="Manage your products here" />
        <Link
          to="/admin/products/new-product"
          className="font-semibold text-white rounded-md my-auto  bg-blue-500 max-lg:text-sm px-2 lg:px-4 py-2 h-fit"
        >
          Add Product
        </Link>
      </div>
      {(loading || !products) && <ProductLoading />}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {products?.length > 0 &&
          !loading &&
          products?.map((product, idx) => (
            <ProductCard key={product?.id + "_" + idx} product={product} />
          ))}
        {products?.length === 0 && !loading && (
          <p className="text-lg text-gray-400 font-semibold">
            No Productd found!, pls create products
          </p>
        )}
      </div>
    </section>
  );
};
export default AdminProducts;

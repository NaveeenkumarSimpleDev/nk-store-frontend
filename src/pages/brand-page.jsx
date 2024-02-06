import React, { Suspense } from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import { fetchPraductsByBrand } from "../feautures/admin/adminApi";
import Heading from "../components/ui/heading";
import ProductCard from "../components/ui/product-card";
import ProductLoading from "../components/product-loading";

const BrandPage = (props) => {
  const { brand } = useLoaderData();
  const params = useParams();
  return (
    <section className="p-4 space-y-4">
      <Heading
        title={params.brand}
        desc={`Explore all products from ${params.brand} brand.`}
      />
      <Suspense fallback={<ProductLoading />}>
        <Await resolve={brand}>
          {(brand) => (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {brand.product?.map((p) => (
                  <ProductCard product={p} key={p.id} />
                ))}
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
};

export default BrandPage;

export const loader = async ({ params }) => {
  return defer({
    brand: fetchPraductsByBrand(params.brand),
  });
};

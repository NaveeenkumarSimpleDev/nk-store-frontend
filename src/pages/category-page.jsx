import React, { Suspense, useState } from "react";
import Heading from "../components/ui/heading";
import { CATEGORIES } from "../config";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import Filters from "../components/filters";
import { fetchPraductsByCategory } from "../feautures/admin/adminApi";
import ProductCard from "../components/ui/product-card";
import ProductLoading from "../components/product-loading";

const CategoryPage = () => {
  const [filter, setFiler] = useState(false);
  const params = useParams();
  const { category } = useLoaderData();
  const desc = CATEGORIES.find((i) => {
    if (i.title.trim().toLowerCase() === params.category.trim().toLowerCase())
      return i;
  });

  return (
    <>
      <div className="py-8">
        <Heading title={params.category} desc={desc.description} />
      </div>

      <Suspense fallback={<ProductLoading />}>
        <Await resolve={category}>
          {(products) => (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {products?.map((p) => (
                <ProductCard product={p} key={p.id} />
              ))}

              {products.length === 0 && (
                <p className="text-xl font-semibold text-neutral-400">
                  No products found!
                </p>
              )}
            </div>
          )}
        </Await>
      </Suspense>

      <div>
        <Filters isOpen={filter} setIsOpen={setFiler} />
      </div>
    </>
  );
};

export default CategoryPage;

export const loader = async ({ params }) => {
  return defer({
    category: fetchPraductsByCategory(params.category),
  });
};

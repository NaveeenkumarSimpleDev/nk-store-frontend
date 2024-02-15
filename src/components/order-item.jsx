import React from "react";

const OrderItem = ({ item }) => {
  if (!item) return null;
  return (
    <section className="grid grid-cols-2">
      <div className="flex gap-3 rounded-md overflow-hidden border">
        <div className="h-[8rem] w-[8rem]">
          <img
            className="object-cover h-full w-full"
            src={item.images[0]}
            alt={item.product.title}
          />
        </div>
        <div className="flex-1 overflow-hidden py-2">
          <p className="font-semibold text-xl truncate">{item.product.title}</p>
          <p className="truncate text-gray-400">{item.product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default OrderItem;

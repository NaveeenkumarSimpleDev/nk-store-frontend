import React from "react";
import { Link } from "react-router-dom";
import Button from "./ui/button";
import { ArrowRight } from "lucide-react";

const OrderItem = ({ order }) => {
  if (!order) return null;
  const item = order?.orderItem;
  return (
    <section className="grid grid-cols-2">
      <div className="flex gap-3 rounded-md overflow-hidden border">
        <div className="h-[8rem] w-[8rem]">
          <img
            className="object-cover h-full w-full"
            src={item.images[0]}
            alt={item.product.title}
            loading="lazy"
          />
        </div>
        <div className="flex-1 overflow-hidden  py-2">
          <div>
            <p className="font-semibold text-xl truncate">
              {item.product.title}
            </p>
            <p className="truncate text-gray-400">{item.product.description}</p>
          </div>

          <Button className=" mt-5 w-fit bg-transparent  text-black p-0">
            <Link
              to={item.id}
              className=" flex text-sm items-center justify-center"
            >
              View Order Details
              <ArrowRight className="h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OrderItem;

import React from "react";
import { Link } from "react-router-dom";
import Button from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSelectedOrder } from "../feautures/orders/orderSlice";

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();
  if (!order) return null;
  const item = order?.orderItem;
  return (
    <div className="flex gap-3 h-full rounded-md overflow-hidden border max-md:h-[6rem]">
      <img
        className="object-cover object-center  max-md:w-[7rem] w-[8rem]"
        src={item.images[0]}
        alt={item.product.title}
        loading="lazy"
      />
      <div className="flex-1 overflow-hidden py-2">
        <div>
          <p className="font-semibold text-xl truncate max-md:text-sm">
            {item.product.title}
          </p>
          <p className="truncate max-md:text-xs text-gray-400">
            {item.product.description}
          </p>
          <p className="font-semibold text-sm text-gray-600 capitalize md:mt-2">
            {order.status}
          </p>
        </div>

        <Button className="md:mt-2 md:pb-2 lg:mt-4 w-fit bg-transparent  text-black p-0">
          <Link
            to={item.id}
            onClick={() => {
              dispatch(setSelectedOrder(order));
            }}
            className=" flex text-sm items-center m-auto max-md:text-xs justify-center"
          >
            View Order Details
            <ArrowRight className="h-3 m-auto md:h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;

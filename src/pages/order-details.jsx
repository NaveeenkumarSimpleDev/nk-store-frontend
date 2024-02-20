import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, redirect, useNavigate, useParams } from "react-router-dom";

import { Loader2 } from "lucide-react";
import Button from "../components/ui/button";
import { getSelectedOrder } from "../feautures/orders/orderSlice";
import OrderStatus from "../components/order-status";
import { formatPrice } from "../lib/utils";

const OrderDetails = () => {
  const order = useSelector(getSelectedOrder);

  if (!order) return null;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const params = useParams();
  // const dispatch = useDispatch();
  const attrbutes = Object.keys(order.orderItem.customAttributes);

  let linkTo = "/products/" + order.orderItem.product.id + "?";
  attrbutes.forEach((a) => {
    linkTo += `${a}=${order.orderItem.customAttributes[a]}&`;
  });

  const totalPrice =
    Number(order.orderItem.quantity) * Number(order.orderItem.buyPrice);
  return (
    <div className="grid lg:grid-cols-2 border rounded-md overflow-hidden">
      <img
        src={order.orderItem.images[0]}
        className="object-cover object-center h-full w-full"
        alt={order.orderItem.title}
      />
      <div className="lg:mx-4 mx-2 max-lg:my-2">
        <div>
          <div className="overflow-hidden">
            <h1 className="text-xl font-bold truncate ">
              <Link to={linkTo}>{order.orderItem.product.title}</Link>
            </h1>
            <h3 className="max-h-[2lh] xl:max-h-[3lh] text-ellipsis">
              {order.orderItem.product.description}
            </h3>
          </div>
          <div className="my-2 lg:my-4">
            <h2 className="font-semibold underline text-lg">Variation</h2>
            {attrbutes.map((k, idx) => (
              <p className="text-gray-800 font-bold" key={idx}>
                {k} : {order.orderItem.customAttributes[k]}
              </p>
            ))}
            <p className="text-lg font-bold mt-2">
              Quantity : {order.orderItem.quantity}
            </p>
            <div>
              <p className="text-lg font-bold mt-2">Total Price</p>
              <p className=" font-semibold">
                {order.orderItem.quantity} x{" "}
                {formatPrice(order.orderItem.buyPrice)} ={" "}
                <span className="text-lg font-bold">
                  {formatPrice(totalPrice)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Shipping Details</h3>
          <p className="border px-2 mt-2 rounded-md">
            {order.selectedAddress}\ 97/54 gowril sdm, adkmdfdfsdfns,
            kasmkdkafndfa, askmdafdkmkfakdmmkfmdfk
          </p>

          <div className="my-4 w-max">
            <h2 className="font-bold text-lg">Order Status</h2>
            <OrderStatus status={order.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminOrders,
  setSelectedOrder,
} from "../../feautures/admin/adminSlice";
import { cn, formatPrice } from "../../lib/utils";
import Heading from "../../components/ui/heading";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAdminOrders);
  return (
    <div class="relative overflow-x-auto">
      <h1 className="mb-4">
        <Heading
          title="Orders"
          desc=" Manage and view orders placed by customers. Monitor order status, track deliveries, and process orders efficiently."
        />
      </h1>
      <table class="w-full text-sm text-left outline shadow-md outline-gray-500 rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Order Item
            </th>
            <th scope="col" class="px-6 py-3">
              Total amount
            </th>
            <th scope="col" class="px-6 py-3">
              Delivary Address
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => {
            const colorOfStatus =
              order.status == "pending"
                ? "bg-yellow-200"
                : order.status == "dispatched"
                ? "bg-pink-200"
                : order.status == "canceled"
                ? "bg-red-400 text-black"
                : "bg-green-200";
            return (
              <tr
                key={order.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.orderItem.product.title}
                </th>
                <td class="px-6 py-4">
                  {order.orderItem.quantity} x {order.orderItem.buyPrice} ={" "}
                  <span className="font-bold text-black">
                    {formatPrice(
                      Number(order.orderItem.quantity) *
                        Number(order.orderItem.buyPrice)
                    )}
                  </span>
                </td>
                <td class="px-6 py-4">{order.selectedAddress}</td>
                <td class="px-6 py-4 capitalize">
                  <span
                    className={cn(
                      "rounded-sm font-semibold text-black/80 py-2 px-4",
                      colorOfStatus
                    )}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 mx-auto">
                  <Link
                    className="text-sm font-semibold border-black border-dotted  border-b"
                    to={order.id}
                    onClick={() => {
                      dispatch(setSelectedOrder(order));
                    }}
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

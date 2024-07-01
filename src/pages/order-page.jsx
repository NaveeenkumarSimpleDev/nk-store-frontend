import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import {
  fetchOrderByUserIdAsync,
  selectOrders,
} from "../feautures/orders/orderSlice";
import Heading from "../components/ui/heading";
import OrderItem from "../components/order-item";
import LoadingIndigator from "../components/loading-indicator";

const OrderPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectOrders);

  useEffect(() => {
    if (!user) return;
    dispatch(fetchOrderByUserIdAsync(user?.id));
  }, []);

  console.log({ orders });
  return (
    <div className="2xl:mt-5">
      <Heading
        title="My Orders"
        desc="All of your orders are here, you can track the status of your order here."
      />

      <div className="py-4 gap-2 grid md:grid-cols-2 overflow-hidden">
        {orders?.length === 0 ? (
          <p className="text-lg font-semibold text-gray-400">
            No Orders found!
          </p>
        ) : orders ? (
          orders?.map((item) => <OrderItem order={item} key={item.id} />)
        ) : (
          <LoadingIndigator className="w-full my-10 flex items-center justify-center" />
        )}
      </div>
    </div>
  );
};

export default OrderPage;

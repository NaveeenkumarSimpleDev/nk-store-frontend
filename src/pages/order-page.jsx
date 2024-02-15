import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import {
  fetchOrderByUserIdAsync,
  selectOrders,
} from "../feautures/orders/orderSlice";
import Heading from "../components/ui/heading";
import OrderItem from "../components/order-item";

const OrderPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectOrders);

  console.log({ orders });
  useEffect(() => {
    if (!user) return;
    dispatch(fetchOrderByUserIdAsync(user?.id));
  }, []);

  return (
    <div>
      <Heading
        title="My Oreders"
        desc="All of your orders are here, you can track the status of your order here."
      />

      <div>
        {orders[0]?.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;

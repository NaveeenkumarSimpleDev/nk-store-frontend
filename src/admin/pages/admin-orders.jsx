import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminOrdersAsync,
  selectAdminOrders,
} from "../../feautures/admin/adminSlice";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";
import Orders from "../components/orders";
import LoadingIndigator from "../../components/loading-indicator";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAdminOrders);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (!user) return;
    dispatch(fetchAdminOrdersAsync(user?.id));
  }, [user?.id]);

  console.log({ orders });
  return (
    <div>
      {!orders && (
        <LoadingIndigator className="w-full mt-[5rem] flex h-full items-center justify-center" />
      )}
      {orders?.length === 0 ? (
        <p className="text-lg font-semibold text-gray-400">No Orders Found</p>
      ) : (
        orders && <Orders />
      )}
    </div>
  );
};

export default AdminOrders;

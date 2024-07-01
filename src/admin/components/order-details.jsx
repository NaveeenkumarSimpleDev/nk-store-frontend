import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminOrdersAsync,
  selectAdminOrders,
  selectSelectedOrder,
} from "../../feautures/admin/adminSlice";
import { redirect, useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectLabel,
} from "../../components/ui/select";
import Button from "../../components/ui/button";
import { updateOrder } from "../../feautures/admin/adminApi";
import { Loader2 } from "lucide-react";

const OrderDetails = () => {
  const order = useSelector(selectSelectedOrder);

  if (!order) return null;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(order.status);
  const orders = useSelector(selectAdminOrders);
  // const params = useParams();
  // const dispatch = useDispatch();
  const attrbutes = Object.keys(order.orderItem.customAttributes);
  // const orderId = params.orderId;

  useEffect(() => {
    if (!order && orders?.length == 0) {
      return;
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateOrder(status, order.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigate("/admin/orders");
    }
  };
  return (
    <div className="grid lg:grid-cols-2 py-6">
      <img src={order.orderItem.images[0]} alt={order.orderItem.title} />
      <div className="lg:mx-4 mx-2 max-lg:my-2">
        <div>
          <div className="overflow-hidden">
            <h1 className="text-xl font-bold">
              {order.orderItem.product.title}
            </h1>
            <h3 className="text-ellipsis">
              {order.orderItem.product.description}
            </h3>

            <p className="font-semibold mt-4  border rounded-md w-fit p-2">
              ORDER ID : <span className="text-base font-bold">{order.id}</span>
            </p>
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
          </div>
        </div>

        <div>
          <h3 className="font-bold">Delivery Address</h3>
          <p>{order.selectedAddress}</p>

          <div className="my-4 w-max">
            <h2 className="font-bold mb-3">Status</h2>

            <Select defaultValue={status} onValueChange={(v) => setStatus(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="dispatched">Dispatched</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="canceled">Cancel</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="font-bold px-4 py-1" onClick={handleSubmit}>
          {loading ? (
            <div className="flex items-center gap-x-1 justify-center">
              <Loader2 className="h-4 animate-spin" />
              <span>Updating..</span>
            </div>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;

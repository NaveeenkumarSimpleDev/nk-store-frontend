import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminOrders,
  setSelectedOrder,
} from "../../feautures/admin/adminSlice";
import { cn, formatPrice } from "../../lib/utils";
import Heading from "../../components/ui/heading";
import Pagination from "../../components/pagination";
import { ArrowDownNarrowWide, SearchIcon } from "lucide-react";
import { set } from "react-hook-form";

const Orders = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const AllOrders = useSelector(selectAdminOrders);
  const [orders, setOrders] = useState([]);
  const [isResult, setIsResult] = useState(false);
  const [sortByPending, setSortByPending] = useState(false);

  const getUpdatedOrders = () => {
    const dpOrders = [...AllOrders];
    const spliced = dpOrders?.splice((page - 1) * 20, 20);
    setOrders(spliced);
  };

  useEffect(() => {
    getUpdatedOrders();
  }, [page]);

  useEffect(() => {
    getSortedOrders();
  }, [sortByPending]);

  const getSortedOrders = () => {
    if (!sortByPending) {
      getUpdatedOrders();
      return;
    }
    const dpOrders = [...AllOrders];
    const pendingOrders = dpOrders?.filter((o) => o?.status === "pending");

    const otherOrders = dpOrders?.filter((o) => o?.status !== "pending");
    const totalOrders = pendingOrders.concat(otherOrders);
    setOrders(totalOrders);
  };

  const handlePage = (p) => {
    if (page === p) return;
    setPage(p);
  };

  const handleSearch = (e) => {
    const val = e.target?.value;

    if (val?.length < 1) {
      getUpdatedOrders();
      setIsResult(false);
      return;
    }

    const filterdOrders = AllOrders?.filter((o) => {
      if (o?.id?.toLowerCase()?.includes(val.toLowerCase())) return o;
    });

    setIsResult(true);
    setOrders(filterdOrders);
  };

  return (
    <div class="relative">
      <div className="mb-4 xl:flex grid items-center justify-between w-full pr-3">
        <Heading
          title="Orders"
          desc="Manage and view orders placed by customers. Monitor order status, track deliveries, and process orders efficiently."
        />
        <div className="flex gap-4 transition delay-100 ease-in-out  items-center bg-white rounded-md xl:py-1.5 py-2 px-3 cursor-pointer border border-gray-100 shadow-sm relative">
          <SearchIcon size={20} />
          <input
            className=" placeholder:text-sm  bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 w-full"
            type="text"
            placeholder="Search order with id."
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <section className="overflow-x-auto">
        <table class="w-full text-sm text-left  outline shadow-md outline-gray-500 rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs ext-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Order Item
              </th>
              <th scope="col" className="px-6 py-3">
                Total amount
              </th>
              <th
                scope="col"
                className="flex gap-2 cursor-pointer items-center px-6 py-3"
                onClick={() => setSortByPending((prev) => !prev)}
              >
                <span>Status</span>{" "}
                <ArrowDownNarrowWide
                  size={15}
                  className={cn(
                    "transition duration-300",
                    sortByPending ? "rotate-180" : "rotate-0"
                  )}
                />
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
                  <td className="font-semibold pl-3">{order.id}</td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium break-words  max-lg:max-w-sm max-w-lg overflow-hidden text-gray-900  dark:text-white"
                  >
                    {order.orderItem.product.title}
                  </th>
                  <td class="px-6 py-4">
                    {/* {order.orderItem.quantity} x {order.orderItem.buyPrice} ={" "} */}
                    <span className="font-bold text-black">
                      {formatPrice(
                        Number(order.orderItem.quantity) *
                          Number(order.orderItem.buyPrice)
                      )}
                    </span>
                  </td>
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
        {!isResult && (
          <div className="mt-3">
            <Pagination
              ITEMS_PER_PAGE={20}
              page={page}
              totalItems={AllOrders?.length}
              key="Admin Orders"
              handlePage={handlePage}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Orders;

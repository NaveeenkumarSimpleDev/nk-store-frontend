import React from "react";
import { cn } from "../lib/utils";

const OrderStatus = ({ status }) => {
  return (
    <>
      <div className="relative space-y-6 overflow-hidden p-4 pb-0 mx-2">
        <div className="flex items-center gap-4 ">
          <p className="h-5 w-5 ring-2 ring-offset-green-950 rounded-full  border bg-green-700 ring-green-900  z-10" />
          <p>Pending</p>
        </div>

        <div className="flex items-center gap-4 ">
          <p
            className={cn(
              "h-5 w-5 rounded-full  border ring-2 ring-gray-300 bg-white z-10",
              (status == "dispatched" || status == "delivered") &&
                "bg-green-700 ring-green-900  ring-offset-green-950"
            )}
          />
          <p>Dispatched</p>
        </div>

        <div className="flex items-center gap-4 ">
          <p
            className={cn(
              "h-5 w-5 rounded-full  border ring-2 2 ring-gray-300 bg-white z-10",
              status == "delivered" &&
                "bg-green-700 ring-green-900 ring-offset-green-950"
            )}
          />
          <p>Delivered</p>
        </div>
        <div className="absolute bg-gray-400 w-1 z-0 top-0 bottom-0 left-[16.5%] h-full">
          <div
            className={cn(
              "bg-green-500 w-full",
              status == "delivered"
                ? "h-[calc(100%-10px)]"
                : status == "dispatched" && "h-[calc(50%-5px)]"
            )}
          />
        </div>
      </div>
    </>
  );
};

export default OrderStatus;

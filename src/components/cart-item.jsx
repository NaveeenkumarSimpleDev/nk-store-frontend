import { Minus, Plus, Trash } from "lucide-react";
import Button from "./ui/button";
import { formatPrice } from "../lib/utils";
import img from "/3.jpg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const quantity = 1
  console.log(item);
  const handleQuantity = (opr, id) => {
    if (opr === "inc") {

    } else if (opr === "desc") {
      if (quantity === 1) {
        //
      } else {

      }
    }
  };

  const total = Number(item?.discountPrice) * Number(quantity);
  return (
    <>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex gap-2">
          <img
            src={img}
            className="h-12 sm:h-20 object-cover rounded-md"
            alt="1"
          />
          <div className="flex flex-col sm:-mt-1 overflow-hidden">
            <span className="overflow-ellipsis text-xs font-bold truncate sm:text-lg sm:font-semibold">
              {item?.title}
            </span>
            <span className=" text-xs sm:text-base font-semibold">
              {formatPrice(item?.discountPrice)} X {formatPrice(quantity)} = $
              {formatPrice(total)}
            </span>
            <span className="text-xs sm:text-sm">{item?.category}</span>
          </div>
        </div>

        <div className="flex gap-1">
          <div className="flex items-center gap-2 sm:gap-4 ">
            <Button
              onClick={() => handleQuantity("desc", item?.id)}
              className=" p-1 sm:p-2  flex items-center justify-center"
            >
              <Minus size={14} />
            </Button>
            <span className=" text-sm sm:text-lg font-semibold">
              {quantity}
            </span>
            <Button
              onClick={() => handleQuantity("inc", item?.id)}
              className="p-1 sm:p-2 flex items-center justify-center"
            >
              <Plus size={16} />
            </Button>
          </div>
          <Button className="p-1 sm:px-2 bg-red-500">
            <Trash size={12} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartItem;

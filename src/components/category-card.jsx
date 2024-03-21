import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const CartegoryCard = ({ title, img, href }) => {
  return (
    <Link
      to={href}
      className={cn(
        "rounded-sm border-2 border-black relative flex items-center justify-center font-bold h-[5rem] lg:h-[8rem]",
        title == "All Categories" &&
          " bg-gradient-to-r from-violet-500 to-fuchsia-500"
      )}
    >
      <p className="z-10 text-xl lg:text-2xl text-black font-bold mx-auto">
        {title}
      </p>
      {title !== "All Categories" && (
        <img
          src={img}
          alt={title}
          className="absolute inset-0 opacity-50 overflow-hidden h-full w-full object-cover object-center"
        />
      )}
    </Link>
  );
};

export default CartegoryCard;

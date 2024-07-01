import React from "react";
import { Link } from "react-router-dom";

const CartegoryCard = ({ title, img, href }) => {
  return (
    <Link
      to={href}
      className={
        // "rounded-sm border-2 p-4 border-black h-[12rem] overflow-hidden w-[10rem]  lg:h-[15rem] lg:w-[18rem] flex flex-col items-center justify-center font-bold"
        "rounded-sm border p-2 border-black flex flex-col items-center justify-center font-bold"
      }
    >
      {/* <div className="max-md:h-32 max-md:w-32 h-44 w-44 xl:h-52 xl:w-52"> */}
      <div className="">
        <img
          src={img}
          alt={title}
          className=" rounded aspect-square h-full w-full object-cover object-center"
        />
      </div>

      <p className="mt-3 text-xl max-lg:text-xs min-w-fit lg:text-base text-black font-bold mx-auto">
        {title}
      </p>
    </Link>
  );
};

export default CartegoryCard;

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./ui/select";

const SortSelectionButton = ({ onChange }) => {
  return (
    <div className="flex flex-col z-[10] gap-2">
      <Select onValueChange={onChange}>
        <SelectTrigger className="z-[10] min-w-[10rem] font-semibold flex gap-4 text-sm sm:text-md bg-black  text-white rounded-md hover:opacity-90">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent className="px-2 pr-6 z-[20]">
          <SelectGroup>
            <SelectLabel className="font-bold text-sm sm:text-md">
              Sort by
            </SelectLabel>
            <SelectSeparator />
            <SelectItem
              value="Newest"
              className="text-xs sm:text-sm  cursor-pointer font-semibold"
            >
              Newest on top
            </SelectItem>
            <SelectItem
              value="priceLowToHigh"
              className="text-xs sm:text-sm font-semibold cursor-pointer"
            >
              Price: Low to high
            </SelectItem>
            <SelectItem
              value="priceHighToLow"
              className="text-xs sm:text-sm font-semibold cursor-pointer"
            >
              Price: High to low
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelectionButton;

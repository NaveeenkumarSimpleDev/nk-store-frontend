import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import SearchPage from "../pages/search-page";

const Search = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex gap-4 transition delay-100 ease-in-out hover:bg-accent items-center bg-white rounded-md xl:py-1.5 py-2 px-3 cursor-pointer border border-gray-100 shadow-sm relative"
      >
        <SearchIcon size={20} />
        <input
          className="disabled:cursor-pointer placeholder:text-sm cursor-pointer hidden xl:block bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 w-full"
          type="text"
          placeholder="Search here.."
          disabled
        />
        <div
          onClick={() => {}}
          className="absolute inset-0 cursor-pointer"
          style={{ zIndex: 1 }}
        ></div>
      </div>

      {open && <SearchPage setOpen={setOpen} />}
    </>
  );
};

export default Search;

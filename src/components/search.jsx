import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex gap-4 transition delay-100 ease-in-out  hover:bg-accent items-center bg-white rounded-md xl:py-1.5 py-2 px-3 cursor-pointer border border-gray-100 shadow-sm">
      <SearchIcon size={20} />
      <input
        className="disabled:cursor-pointer placeholder:text-sm hidden xl:block bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 w-full"
        type="text"
        placeholder="Search here.."
        disabled
      />
    </div>
  );

};

export default Search;
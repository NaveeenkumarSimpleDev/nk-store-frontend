import { CATEGORIES } from "../../config";

const ProductForm = () => {
  return (
    <div>
      <form action="">
        <div className="flex flex-col ">
          <label htmlFor="title" className=" font-bold text-xl">
            Title
          </label>
          <input
            type="text"
            className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
            name="title"
            id="title"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="description" className=" font-bold text-xl">
            Description
          </label>
          <input
            type="text"
            className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
            name="description"
            id="description"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col ">
            <label htmlFor="price" className=" font-bold text-xl">
              Price (MRP)
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
              name="price"
              id="price"
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="discountPrice" className=" font-bold text-xl">
              Discount Price
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
              name="discountPrice"
              id="discountPrice"
            />
          </div>
        </div>
        <div>
            <select name="category" id="category">
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

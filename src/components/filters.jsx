import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import Button from "./ui/button";
import { cn } from "../lib/utils";
import { fetchProductsAsync } from "../feautures/product/productSlice";
import { useDispatch } from "react-redux";

const Filters = ({ isOpen, setIsOpen }) => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const updateURLWithFilters = () => {
      const urlSearchParams = new URLSearchParams(window.location.search);

      // Price range filter
      if (priceRange[1] !== 0) {
        urlSearchParams.set("range", priceRange.join("-"));
      }

      // Category filter
      if (selectCategories.length > 0) {
        urlSearchParams.set("cat", selectCategories.join(","));
      } else {
        urlSearchParams.delete("cat");
      }

      // Brand filter
      if (selectedBrands.length > 0) {
        urlSearchParams.set("brand", selectedBrands.join(","));
      } else {
        urlSearchParams.delete("brand");
      }

      const newUrl = `${
        window?.location.pathname
      }?${urlSearchParams.toString()}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    };
    if (mounted) {
      updateURLWithFilters();
    } else {
      setMounted(true);
    }
  }, [priceRange, selectCategories, selectedBrands]);

  const applyFilters = useCallback(() => {
    dispatch(fetchProductsAsync());
  }, []);

  const clearFilters = useCallback(() => {
    setPriceRange([0, 0]);
    setSelectedBrands([]);
    setSelectedCategories([]);

    // Clear filter parameters from the URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.delete("range");
    urlSearchParams.delete("cat");
    urlSearchParams.delete("brand");

    const newUrl = `${window?.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }, []);

  const categories = [
    {
      id: "1",
      label: "Fashion",
    },
    {
      id: "2",
      label: "Mobiles",
    },
    {
      id: "3",
      label: "Cat3",
    },
  ];

  const brands = [
    {
      id: "b1",
      label: "Apple",
    },
    {
      id: "b2",
      label: "Nike",
    },
  ];

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className={cn(
            " z-[100] fixed left-0 top-0 min-h-screen min-w-full bg-[rgba(0,0,0,0.1)]"
          )}
        />
      )}
      <nav
        className={cn(
          "h-full z-[160] fixed top-0 right-0",
          isOpen ? "clip-inset-100" : "-clip-inset-0"
        )}
      >
        <section className=" w-[90vw] sm:max-w-[600px] h-full overflow-auto bg-white">
          <div className="flex p-4 pt-5 items-center">
            <div
              onClick={onClose}
              className="hover:bg-accent p-1 cursor-pointer rounded-full"
            >
              <X strokeWidth={3} size={20} />
            </div>
            <span className="font-bold ml-12 text-xl">FILTERS</span>
          </div>

          <hr className="my-1" />

          {/* filters */}
          <div className="px-6 py-1 flex flex-col">
            <div className="mt-4 flex flex-col gap-4">
              {/* price range */}
              <div className="space-y-3">
                <span className="font-bold text-lg">Price Range</span>
                <div className="flex items-center justify-between">
                  <input
                    className="w-[7rem] sm:w-full bg-black px-4 py-2 rounded-sm text-white text-sm font-semibold "
                    type="number"
                    inputMode="numeric"
                    step={100}
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPriceRange((prev) => [Number(value), prev[1]]);
                    }}
                  />
                  <span className="text-xl mx-4">-</span>
                  <input
                    className="w-[7rem] sm:w-full bg-black px-4 py-2 rounded-sm text-white text-sm font-semibold"
                    type="number"
                    inputMode="numeric"
                    step={100}
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPriceRange((prev) => [prev[0], Number(value)]);
                    }}
                  />
                </div>
              </div>

              {/* categories */}
              <div>
                <span className="text-lg font-bold">Categories</span>
                <div className="mt-3 overflow-y-scroll space-y-3">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex gap-1 items-center">
                      <Checkbox
                        id={cat.id}
                        checked={selectCategories.includes(cat.label)}
                        onCheckedChange={(value) =>
                          value
                            ? setSelectedCategories((prev) => [
                                ...prev,
                                cat.label,
                              ])
                            : setSelectedCategories(
                                selectCategories.filter(
                                  (item) => item !== cat.label
                                )
                              )
                        }
                      />
                      <label
                        className="text-sm font-semibold cursor-pointer"
                        htmlFor={cat.id}
                      >
                        {cat.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <span className="text-lg font-bold">Brands</span>
                <div className="mt-3 h-[200px] overflow-y-scroll space-y-3">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex gap-1 items-center">
                      <Checkbox
                        id={brand.id}
                        checked={selectedBrands.includes(brand.label)}
                        onCheckedChange={(value) =>
                          value
                            ? setSelectedBrrands((prev) => [
                                ...prev,
                                brand.label,
                              ])
                            : setSelectedBrrands(
                                selectedBrands.filter(
                                  (item) => item !== brand.label
                                )
                              )
                        }
                      />
                      <label
                        className="text-sm font-semibold cursor-pointer"
                        htmlFor={brand.id}
                      >
                        {brand.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-6">
              <Button
                onClick={clearFilters}
                className="bg-white outline outline-1 outline-black text-black font-bold"
              >
                Clear Filters
              </Button>
              <Button onClick={applyFilters} className="font-bold">
                Apply Filters
              </Button>
            </div>
          </div>
        </section>
      </nav>
      {/* </div> */}
    </>
  );
};

export default Filters;

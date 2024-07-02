import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;

export const useGetItemsPerPage = () => {
  const windowWidth = useWindowWidth();
  const [ITEMS_PER_PAGE, setItemsPerPage] = useState(() => {
    return windowWidth < 1024
      ? 10
      : windowWidth > 1024 && windowWidth < 1280
      ? 9
      : windowWidth > 1280 && windowWidth < 1540
      ? 8
      : 10;
  });

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(() => {});
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return {
    ITEMS_PER_PAGE,
  };
};

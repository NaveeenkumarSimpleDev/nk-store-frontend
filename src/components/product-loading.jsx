const ProductLoading = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {new Array(10).fill(0).map((i, idx) => (
        <div className="border rounded-lg p-4 animate-pulse" key={idx}>
          <div className="h-48 bg-gray-300 mb-4 rounded-lg"></div>
          <div className="flex items-center gap-4">
            <div className="w-3/4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-3/4 h-4 bg-gray-300 mt-4 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductLoading;

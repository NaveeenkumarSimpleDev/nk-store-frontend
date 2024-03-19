import React from "react";
import Button from "./ui/button";
import { WifiOffIcon } from "lucide-react";

const NetworkError = () => {
  return (
    <div className="h-screen absolute top-0 inset-0 w-full flex flex-col items-center justify-center overflow-hidden">
      <div>
        <WifiOffIcon className="mx-auto h-20 w-20" />
        <h1 className="text-center font-bold text-xl ">
          No Internet Connection
        </h1>
        <p className="text-gray-400">
          Please check your internet connectivity and try again
        </p>
      </div>

      <Button
        className="font-semibold rounded-lg my-4"
        onClick={() => {
          window.location.reload();
        }}
      >
        Retry
      </Button>
    </div>
  );
};

export default NetworkError;

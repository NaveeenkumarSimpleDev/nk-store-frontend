import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/layout/nav-bar";

const RootLayout = () => {
  return (
    <>
      <div className=" min-w-[310px] max-w-[3840px] min-h-[100vh] mx-auto border-x">
        <Navbar />
        <section className="lg:px-8 px-6 py-20">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default RootLayout;

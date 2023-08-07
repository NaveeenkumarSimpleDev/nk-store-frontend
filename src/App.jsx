import React from "react";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RegisterPage from "./pages/register-page";
import LoginPage from "./pages/login-page";
import RootLayout from "./root-layout";
import ProductPage from "./pages/product-page";
import ToasterProvider from "./provider/toaster-provider";
import { useEffect } from "react";
import { checkAuthAsync, selectLoggedInUser } from "./feautures/auth/authSlice";
import ProductDetails from "./components/product-details";
import { fetchCartByUserIdAsync } from "./feautures/cart/cartSlice";
import HomePage from "./pages/home-page";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: (
      <p className="text-2xl font-bold">
        Not Found ,Go to{" "}
        <Link className="underlinde" to="/">
          Home
        </Link>
      </p>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/products",
        children: [
          {
            index: true,
            element: <ProductPage />,
          },
          {
            path: ":productId",
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: "/signUp",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchCartByUserIdAsync(loggedInUser?.id));
    }
  }, [loggedInUser]);

  return (
    <>
      <RouterProvider router={routes} />;
      <ToasterProvider />
    </>
  );
};

export default React.memo(App);
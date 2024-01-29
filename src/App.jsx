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
import { fetchUserByIdAsync } from "./feautures/user/userSlice";
import Favorites from "./pages/favorites";
import CartProvider from "./context/cart-context";
import AdminDashboard from "./admin/pages/dashboard";
import ProtectedRoute from "./admin/components/protected";
import AdminLayout from "./admin/pages/admin-laout";
import AdminProducts from "./admin/pages/admin-products";
import AddProduct from "./admin/pages/new-product";
import EdidProduct from "./admin/pages/edit-product";

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
      {
        path: "/favourites",
        element: <Favorites />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "products",
            element: (
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            ),
          },
          { path: "orders", element: <p>Orders</p> },
          {
            path: "products/new-product",
            element: (
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "products/edit/:editId",
            element: (
              <ProtectedRoute>
                <EdidProduct />
              </ProtectedRoute>
            ),
          },
        ],
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
      dispatch(fetchUserByIdAsync(loggedInUser?.id));
    }
  }, [loggedInUser, dispatch]);

  return (
    <>
      <CartProvider>
        <RouterProvider router={routes} />;
        <ToasterProvider />
      </CartProvider>
    </>
  );
};

export default React.memo(App);

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
import ProtectedRoute from "./admin/components/protected";
import AdminLayout from "./admin/pages/admin-laout";
import AdminProducts from "./admin/pages/admin-products";
import AddProduct from "./admin/pages/new-product";
import EdidProduct from "./admin/pages/edit-product";
import { fetchAdminProductsAsync } from "./feautures/admin/adminSlice";
import CategoriesPage from "./pages/categories-page";
import CategoryPage, { loader as categoryLoader } from "./pages/category-page";
import BrandPage, { loader as brandLoader } from "./pages/brand-page";
import CheckOutPage from "./pages/checkout";
import SuccessPage from "./components/success";

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
        path: "/brands/:brand",
        element: <BrandPage />,
        loader: brandLoader,
      },
      {
        path: "/categories",
        children: [
          {
            index: true,
            element: <CategoriesPage />,
          },
          {
            path: ":category",
            element: <CategoryPage />,
            loader: categoryLoader,
          },
        ],
      },
      {
        path: "/checkout",
        element: <CheckOutPage />,
      },
      {
        path: "/checkout/success",
        element: <SuccessPage />,
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
    dispatch(fetchAdminProductsAsync(loggedInUser?.email));
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

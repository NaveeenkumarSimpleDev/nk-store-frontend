import React, { Suspense } from "react";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RegisterPage from "./pages/register-page";
import LoginPage, { loginLoader } from "./pages/login-page";
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
import ProtectedRoute from "./admin/components/protected";
import AdminLayout from "./admin/pages/admin-layout";
import AdminProducts from "./admin/pages/admin-products";
import AddProduct from "./admin/pages/new-product";
import EdidProduct from "./admin/pages/edit-product";
import { fetchAdminProductsAsync } from "./feautures/admin/adminSlice";
import CategoriesPage from "./pages/categories-page";
import CategoryPage, { loader as categoryLoader } from "./pages/category-page";
import BrandPage, { loader as brandLoader } from "./pages/brand-page";
import CheckOutPage from "./pages/checkout";
import OrderPage from "./pages/order-page";
import ProtectedAdmin from "./admin/components/protected-admin";
import { fetchOrderByUserIdAsync } from "./feautures/orders/orderSlice";
import {
  fetchBrandsAsync,
  fetchFavouritesAsync,
} from "./feautures/product/productSlice";
import AdminOrderDetails from "./admin/components/order-details";
import AdminOrders from "./admin/pages/admin-orders";
import OrderDetails from "./pages/order-details";
import StripeWrapper from "./provider/stripe-wrapper";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: loginLoader,
    id: "root",
    errorElement: (
      <p className="text-2xl font-bold">
        Something wrong!
        <Link className="underlinde" to="/">
          Home
        </Link>
      </p>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading</p>}>
            <HomePage />
          </Suspense>
        ),
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
        element: (
          <ProtectedRoute>
            <StripeWrapper>
              <CheckOutPage />
            </StripeWrapper>
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders/:orderId",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "/admin",
        element: (
          <ProtectedAdmin>
            <AdminLayout />
          </ProtectedAdmin>
        ),
        children: [
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "orders/:orderId",
            element: <AdminOrderDetails />,
          },
          {
            path: "products/new-product",
            element: <AddProduct />,
          },
          {
            path: "products/edit/:editId",
            element: <EdidProduct />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);

  async function fetchLoggedInUser() {
    await dispatch(checkAuthAsync());
  }
  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchCartByUserIdAsync(loggedInUser?.id));
      dispatch(fetchUserByIdAsync(loggedInUser?.id));
      dispatch(fetchOrderByUserIdAsync(loggedInUser?.id));
      dispatch(fetchFavouritesAsync(loggedInUser?.id));
      dispatch(fetchBrandsAsync());
      if (loggedInUser?.role === "admin") {
        dispatch(fetchAdminProductsAsync(loggedInUser?.email));
      }
    }
  }, [loggedInUser, dispatch]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToasterProvider />
    </>
  );
};

export default App;

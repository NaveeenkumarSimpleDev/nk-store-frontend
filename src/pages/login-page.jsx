import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Heading from "../components/ui/heading";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser, setUser } from "../feautures/auth/authSlice";
import Model from "../components/model";
import { Dot, DotIcon, Loader2 } from "lucide-react";
import Input from "../admin/components/input";
import {
  checkAuth,
  isAuthenticated,
  loginUser,
} from "../feautures/auth/authAPI";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const user = useSelector(selectLoggedInUser);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await loginUser(data);
      dispatch(setUser(user));
    } catch (error) {
      console.log("LOGIN", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user || isAuthenticated()) {
      return navigate(from && from !== "/login" ? from : "/");
    }
  }, [user]);

  return (
    <>
      <Model
        backButtonHref={from}
        className="max-md:min-w-[80vw] animate-[animateToTop] transition duration-300"
      >
        <div
        // className={`flex items-center justify-center mx-4  min-h-screen bg-gray-100  `}
        >
          <div className="w-full p-6 z-[151]   bg-white rounded-md shadow-md">
            <div className="flex flex-col items-center justify-center">
              <Heading title="Welcome back!" />
              <p className="my-2 text-center text-gray-500">
                Enter your username and password to access your account.
              </p>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <div>
                <Input
                  name="email"
                  type="email"
                  register={register}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none "
                  label="Email"
                  required="Email is required"
                  errors={errors}
                  onFocus={() => {
                    if (error.email) {
                      setError((prev) => ({
                        ...prev,
                        email: false,
                      }));
                    }
                  }}
                />
                {error.email && !errors["email"] && (
                  <p className="text-red-500 font-semibold">{error.email}</p>
                )}
              </div>

              <div>
                <Input
                  label="Password"
                  name="password"
                  register={register}
                  errors={errors}
                  required="Password is required"
                  type="password"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none "
                  onFocus={() => {
                    if (error.password) {
                      setError((prev) => ({
                        ...prev,
                        password: false,
                      }));
                    }
                  }}
                />

                {error.password && (
                  <p className="text-red-500 font-semibold">{error.password}</p>
                )}
              </div>

              <Button
                isLoading={loading}
                disabled={loading}
                type="submit"
                className="w-full mt-4 shrink-0 uppercase text-sm font-semibold disabled:bg-black/70"
              >
                {loading ? (
                  <div className="flex items-center gap-x-2 justify-center">
                    <Loader2 className="h-6 animate-spin" />
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="mt-4 text-sm">
              Don't have an account?{" "}
              <Link
                to={loading ? null : "/signUp"}
                state={{ from }}
                className={`font-semibold text-purple-600 ${
                  loading ? "pointer-events-none" : ""
                }`}
              >
                Click here to sign up
              </Link>
            </p>
          </div>
        </div>
      </Model>
    </>
  );
};

export default LoginPage;

export async function loginLoader() {
  return new Promise(async (resolve) => {
    try {
      const user = await checkAuth();
      resolve(user);
    } catch (error) {
      console.log("Error", error);

      if (error?.message == "Network Error") {
        resolve({ error });
      }

      resolve(null);
    }
  });
}

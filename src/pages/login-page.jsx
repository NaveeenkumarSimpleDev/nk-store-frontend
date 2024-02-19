import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/ui/button";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import Heading from "../components/ui/heading";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoggedInUser,
  loginUserAsync,
  setUser,
} from "../feautures/auth/authSlice";
import Model from "../components/model";
import { Loader2 } from "lucide-react";
import Input from "../admin/components/input";
import { loginUser } from "../feautures/auth/authAPI";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const user = useSelector(selectLoggedInUser);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;

  const {
    handleSubmit,
    register,
    reset,
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
      // reset();
    }
  };
  console.log(from);

  return (
    <>
      {user && <Navigate to={from != "/login" ? from : "/"} replace={true} />}
      <Model
        backButtonHref={from?.toString().startsWith("/login") ? "/" : from}
      >
        <div className="flex items-center justify-center mx-4  min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 z-[151] bg-white rounded-md shadow-md">
            <Heading title="Welcome back!" />

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
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                  label="Email"
                  required="Email is required"
                  errors={errors}
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
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                />

                {error.password && (
                  <p className="text-red-500 font-semibold">{error.password}</p>
                )}
              </div>

              <Button
                isLoading={loading}
                disabled={loading}
                type="submit"
                className="w-full mt-4 uppercase text-sm font-semibold disabled:bg-black/70"
              >
                {loading ? (
                  <div className="flex items-center gap-x-2 justify-center">
                    <Loader2 className="h-6 animate-spin" />
                    <span className="text-sm font-semibold capitalize">
                      Please wait....
                    </span>
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

export default React.memo(LoginPage);

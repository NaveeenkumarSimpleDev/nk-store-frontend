import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/ui/button";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Heading from "../components/ui/heading";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoggedInUser,
  loginUserAsync,
  selectError,
  selectAuthStatus,
} from "../feautures/auth/authSlice";
import Model from "../components/model";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);
  const authStatus = useSelector(selectAuthStatus);
  const loginError = useSelector(selectError)?.login;
  const [errorsState, setErrorsState] = useState({});
  const location = useLocation();
  const from = location.state?.from || -1;

  if (user) return navigate(from);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    // email validation
    if (email.trim() === "" || password.trim() === "") {
      setErrorsState((prev) => ({
        ...prev,
        password: "Invaid credentials",
      }));
      return;
    }
    if (!email.includes("@")) {
      setErrorsState((prev) => ({
        ...prev,
        email: "Invalid email, include '@' ex.abc@some.com ",
      }));
      return;
    }
    dispatch(loginUserAsync(data));
  };

  return (
    <>
      <Model backButtonHref={from.toString().startsWith("/login") ? "/" : from}>
        <div className="flex items-center justify-center  min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 z-[151] bg-white rounded-md shadow-md">
            <Heading title="Welcome back!" />

            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required." })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                />
                {(errors.email || errorsState.email) && (
                  <span className="text-xs text-red-600 font-semibold">
                    {errorsState.email
                      ? errorsState.email
                      : errors?.email?.message}
                  </span>
                )}
                {loginError && (
                  <span className="text-xs text-red-600 font-semibold">
                    {loginError?.error?.message?.email}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                />
                {(errors.password || errorsState.password) && (
                  <span className="text-xs text-red-600 font-semibold">
                    {errorsState.password
                      ? errorsState.password
                      : errors?.password?.message}
                  </span>
                )}
                {loginError && (
                  <span className="text-xs text-red-600 font-semibold">
                    {loginError?.error?.message?.password}
                  </span>
                )}
              </div>

              <Button
                isLoading={authStatus === "loading"}
                disabled={authStatus === "loading"}
                className="w-full mt-4 uppercase text-sm font-semibold disabled:bg-muted-foreground"
              >
                {authStatus === "loading" ? (
                  <div className="flex items-center gap-x-2 justify-center">
                    <Loader2 className="h-6 animate-spin" />
                    <span className="text-sm font-semibold">
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
                to={authStatus === "loading" ? null : "/signUp"}
                state={{ from }}
                className={`font-semibold text-purple-600 ${
                  authStatus === "loading" ? "pointer-events-none" : ""
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

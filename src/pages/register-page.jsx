import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/ui/button";
import { Link, Navigate, useLocation } from "react-router-dom";
import Heading from "../components/ui/heading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createuserAsync,
  selectAuthStatus,
  selectError,
  selectLoggedInUser,
} from "../feautures/auth/authSlice";
import { Loader2 } from "lucide-react";
import Model from "../components/model";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [errorsState, setErrorsState] = useState({});
  const authStatus = useSelector(selectAuthStatus);
  const error = useSelector(selectError);
  const location = useLocation();
  const from = location.state?.from;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  console.log({ from });
  const onSubmit = async (data) => {
    const { name, email, password, confirmPass } = data;
    // name validation
    if (!name || name.length === 0 || name === "") {
      setErrorsState((prev) => ({
        ...prev,
        name: "Enter name",
      }));
      return;
    }

    // email validation
    if (!email.includes("@") || email.trim() === "" || !email) {
      setErrorsState((prev) => ({
        ...prev,
        email: "Invalid Email",
      }));
      return;
    }

    // password check
    if (password !== confirmPass) {
      setErrorsState((prev) => ({
        ...prev,
        confirmPass: "password does not match.",
      }));
      return;
    }

    try {
      dispatch(createuserAsync(data));
    } catch (err) {
      console.log(err);
    } finally {
      setErrorsState({});
    }
  };

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <Model backButtonHref={from}>
        <div className="flex items-center justify-center min-h-screen max-h-screen">
          <div className="w-full max-w-md p-6 z-[151] bg-white rounded-md shadow-md">
            <Heading title="Create an account." />

            <form
              noValidate
              className="mt-4 space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Name is required.",
                    maxLength: {
                      value: 20,
                      message: "Maximum 20 characters.",
                    },
                  })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                />
                {(errors?.name || errorsState.name) && (
                  <span className="text-xs text-red-600 font-semibold">
                    {errorsState.name
                      ? errorsState.name
                      : errors?.name?.message}
                  </span>
                )}
              </div>

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
                {error && error.signUp?.error?.message && (
                  <span className="text-xs text-red-600 font-semibold">
                    {error.signUp?.error?.message}
                  </span>
                )}
                {(errors?.email || errorsState.email) && (
                  <span className="text-xs text-red-600 font-semibold">
                    {errorsState.email
                      ? errorsState.email
                      : errors?.email?.message}
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
                {(errors?.password || errorsState.password) && (
                  <span className="text-xs text-red-600 font-semibold">
                    {errorsState.password
                      ? errorsState.password
                      : errors?.password?.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPass"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPass"
                  type="password"
                  {...register("confirmPass", {
                    required: "Confirm Password is required.",
                  })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                />
                {errorsState.confirmPass && (
                  <span className="text-xs text-red-600 font-semibold">
                    {errorsState.confirmPass}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={authStatus === "loading"}
                isLoading={authStatus === "loading"}
                className="w-full uppercase text-sm font-semibold disabled:bg-muted-foreground"
              >
                {authStatus === "loading" ? (
                  <div className="flex items-center gap-x-2 justify-center">
                    <Loader2 className="h-6 animate-spin" />
                    <span className="text-sm font-semibold">
                      Please wait....
                    </span>
                  </div>
                ) : (
                  "Register"
                )}
              </Button>
            </form>

            <p className="mt-4 text-sm">
              Already have an account?{" "}
              <Link
                to={authStatus === "loading" ? null : "/login"}
                className={`font-semibold text-purple-600 ${
                  authStatus === "loading" ? "pointer-events-none" : ""
                }`}
              >
                Click here to login
              </Link>
            </p>
          </div>
        </div>
      </Model>
    </>
  );
};

export default React.memo(RegisterPage);

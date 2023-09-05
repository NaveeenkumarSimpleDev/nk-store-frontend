import React, { useEffect } from "react";
import { useForm, set } from "react-hook-form";
import Button from "../components/ui/button";
import { Link, Navigate, redirect } from "react-router-dom";
import Heading from "../components/ui/heading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createuserAsync,
  selectAuthStatus,
  selectLoggedInUser,
} from "../feautures/auth/authSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [errorsState, setErrorsState] = useState({});
  const authStatus = useSelector(selectAuthStatus);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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
      <Link
        to=".."
        className="cursor-default min-h-screen fixed z-[150] top-0 left-0 right-0 bg-[rgba(0,0,0,0.6)]"
      />
      <div className="flex items-center justify-center">
        <form
          noValidate
          className=" bg-gray-200 z-[200] py-8 shadow-card-foreground shadow-lg rounded-lg px-12 max-w-lg flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading title="Create an account." />

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="w-full border-none outline outline-1 rounded-md  focus:outline-2 px-2 py-1 focus:outline-purple-600"
                {...register("name", {
                  required: "Name is required.",
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 character.",
                  },
                })}
              />
              {(errors?.name || errorsState.name) && (
                <span className="text-xs text-red-600 font-semibold">
                  {errorsState.name ? errorsState.name : errors?.name?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="border-none outline outline-1 rounded-md  focus:outline-2 px-2 py-1 focus:outline-purple-600"
                type="email"
                {...register("email", { required: "Email is required." })}
              />
              {(errors?.email || errorsState.email) && (
                <span className="text-xs text-red-600 font-semibold">
                  {errorsState.email
                    ? errorsState.email
                    : errors?.email?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="password">
                Password
              </label>

              <input
                id="password"
                className="border-none outline outline-1 rounded-md  focus:outline-2 px-2 py-1 focus:outline-purple-600"
                type="password"
                {...register("password", { required: "Password is required." })}
              />
              {(errors?.password || errorsState.password) && (
                <span className="text-xs text-red-600 font-semibold">
                  {errorsState.password
                    ? errorsState.password
                    : errors?.password?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="confirmPass">
                Confirm password
              </label>

              <input
                id="confirmPass"
                className="border-none outline outline-1 rounded-md  focus:outline-2 px-2 py-1 focus:outline-purple-600"
                type="password"
                {...register("confirmPass", { required: true })}
              />
              {errorsState.confirmPass && (
                <span className="text-xs text-red-600 font-semibold">
                  {errorsState.confirmPass}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={authStatus === "loading"}
            isLoading={authStatus === "loading"}
            className="uppercase text-sm font-semibold"
          >
            register
          </Button>
          <p>
            Already have an account?
            <Link
              to={authStatus === "loading" ? null : "/login"}
              className={`mx-2 font-semibold ${
                authStatus === "loading" ? "disabled-link" : ""
              }`}
              style={{
                pointerEvents: authStatus === "loading" ? "none" : "auto",
              }}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default React.memo(RegisterPage);

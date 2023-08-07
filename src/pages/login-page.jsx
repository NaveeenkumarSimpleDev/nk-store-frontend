import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/ui/button";
import { Link, Navigate } from "react-router-dom";
import Heading from "../components/ui/heading";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoggedInUser,
  loginUserAsync,
  selectError,
} from "../feautures/auth/authSlice";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const loginError = useSelector(selectError)?.login;
  const [errorsState, setErrorsState] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

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

    // dispath loginuser call
    try {
      await dispatch(loginUserAsync(data));
    } catch (err) {
      toast.err("Something went wrong!");
      console.log(err);
    } finally {
      setErrorsState({});
      setLoading(false);
    }
  };

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}

      <Link
        to=".."
        className="cursor-default h-screen fixed z-[150] top-0 left-0 right-0 bg-[rgba(0,0,0,0.8)]"
      />
      <div className="h-screen z-[150] flex items-center -mt-10 justify-center">
        <form
          noValidate
          className="h-fit bg-gray-200 z-[200] py-8 shadow-card-foreground shadow-lg rounded-lg px-12 max-w-lg flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading title="Welcome back!" />

          <div className="space-y-4">
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
              {loginError?.error?.message?.email ? (
                <span className="text-xs truncate overflow-ellipsis text-red-600 font-semibold">
                  {loginError?.error?.message?.email}
                </span>
              ) : (
                (errors?.email || errorsState.email) && (
                  <span className="text-xs text-red-600 font-semibold">
                    {errorsState.email
                      ? errorsState.email
                      : errors?.email?.message}
                  </span>
                )
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
              {loginError?.error?.message?.password ? (
                <span className="text-xs truncate overflow-ellipsis text-red-600 font-semibold">
                  {loginError?.error?.message?.password}
                </span>
              ) : (
                (errors?.password || errorsState.password) && (
                  <span className="text-xs truncate overflow-ellipsis text-red-600 font-semibold">
                    {errorsState.password
                      ? errorsState.password
                      : errors?.password?.message}
                  </span>
                )
              )}
            </div>
          </div>

          <Button
            disabled={loading}
            className="uppercase text-sm font-semibold"
          >
            Login
          </Button>
          <p>
            create an account?
            <Link to="/signUp" className=" mx-2 font-semibold underline">
              click here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default React.memo(LoginPage);

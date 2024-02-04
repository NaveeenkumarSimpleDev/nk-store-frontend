import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/ui/button";
import { Link, Navigate, useLocation } from "react-router-dom";
import Heading from "../components/ui/heading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createuserAsync,
  selectLoggedInUser,
} from "../feautures/auth/authSlice";
import { Loader2 } from "lucide-react";
import Model from "../components/model";
import Input from "../admin/components/input";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [errorsState, setErrorsState] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { password, confirmPass } = data;

    // password check
    if (password !== confirmPass) {
      setErrorsState((prev) => ({
        ...prev,
        confirmPass: "password does not match.",
      }));
      return;
    }
    setLoading(true);

    await dispatch(createuserAsync(data));

    setLoading(false);
    setErrorsState({});
    reset();
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
              <Input
                label="Name"
                errors={errors}
                register={register}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                name="name"
                rules={{
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 characters.",
                  },
                }}
                required="Name is required."
              />

              <Input
                label="Email"
                errors={errors}
                register={register}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                name="email"
                required="Email is required."
                type="email"
              />

              <Input
                label="Password"
                errors={errors}
                register={register}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                name="password"
                required="Password is required."
                type="password"
              />

              <div>
                <Input
                  label="Confirm Password"
                  errors={errors}
                  register={register}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                  name="confirmPass"
                  required="Confirm password is required."
                  type="password"
                />
                {errorsState.confirmPass && (
                  <span className="text-xs text-red-600 font-semibold">
                    {errorsState.confirmPass}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                isLoading={loading}
                className="w-full uppercase text-sm font-semibold disabled:bg-black/60"
              >
                {loading ? (
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
                to={loading ? null : "/login"}
                className={`font-semibold text-purple-600 ${
                  loading ? "pointer-events-none" : ""
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

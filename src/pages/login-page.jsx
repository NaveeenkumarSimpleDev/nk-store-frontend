import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Heading from "../components/ui/heading";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoggedInUser,
  loginUserAsync,
} from "../feautures/auth/authSlice";
import Model from "../components/model";
import { Loader2 } from "lucide-react";
import Input from "../admin/components/input";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from || "/";

  if (user) return navigate(from);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(loginUserAsync(data));
    setLoading(false);
    reset();
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
                <Input
                  name="email"
                  type="email"
                  register={register}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                  label="Email"
                  required="Email is required"
                  errors={errors}
                />
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
              </div>

              <Button
                isLoading={loading}
                disabled={loading}
                className="w-full mt-4 uppercase text-sm font-semibold disabled:bg-black/60"
              >
                {loading ? (
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

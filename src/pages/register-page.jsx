import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Heading from "../components/ui/heading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, setUser } from "../feautures/auth/authSlice";
import { Loader2 } from "lucide-react";
import Model from "../components/model";
import Input from "../admin/components/input";
import { createUser, isAuthenticated } from "../feautures/auth/authAPI";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [errorsState, setErrorsState] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from;
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
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
    try {
      const user = await createUser(data);
      dispatch(setUser(user));
    } catch (error) {
      setErrorsState((prev) => ({
        ...prev,
        email: error,
      }));

      console.log("SIGNUP", error);
    } finally {
      setLoading(false);
      // reset();
    }
  };

  useEffect(() => {
    if (user || isAuthenticated()) {
      navigate(from && from !== "/login" ? from : "/");
    }
  }, [user]);

  return (
    <>
      <Model backButtonHref={from}>
        <div className="flex items-center mx-4 justify-center min-h-screen max-h-screen">
          <div className="w-full max-w-md p-6 z-[151] bg-white rounded-md shadow-md  bg-gradient-to-b from-fuchsia-300 via-black/25 to-white">
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

              <div>
                <Input
                  label="Email"
                  errors={errors}
                  register={register}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-600"
                  name="email"
                  required="Email is required."
                  type="email"
                  onFocus={() => {
                    if (errorsState.email) {
                      setErrorsState((prev) => ({
                        ...prev,
                        email: false,
                      }));
                    }
                  }}
                />
                {errorsState.email && !errors["email"] && (
                  <p className="text-red-500 font-semibold">
                    {errorsState.email?.message}
                  </p>
                )}
              </div>
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
                  onFocus={() => {
                    if (errorsState.confirmPass) {
                      setErrorsState((prev) => ({
                        ...prev,
                        confirmPass: false,
                      }));
                    }
                  }}
                />
                {errorsState.confirmPass && !errors["confirmPass"] && (
                  <span className="text-xs text-red-600 font-semibold">
                    {errorsState.confirmPass}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                isLoading={loading}
                className="w-full uppercase text-sm font-semibold disabled:bg-black/70"
              >
                {loading ? (
                  <div className="flex items-center gap-x-2 justify-center">
                    <Loader2 className="h-6 animate-spin" />
                    <span className="text-sm font-semibold capitalize">
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

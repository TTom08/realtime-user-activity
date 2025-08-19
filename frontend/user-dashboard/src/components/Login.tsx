import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

interface LoginFormData {
  userName: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.userName,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        setErrorMessage("Invalid username or password. Please try again.");
        const errorText = await response.text();
        throw new Error(
          errorText || `Authentication failed with status: ${response.status}`,
        );
      }

      const token = await response.text();
      console.log("JWT Token received:", token);

      localStorage.setItem("authToken", token);

      navigate("/home");
    } catch (error) {
      console.error("Error during authentication: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="custom-bg flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center text-xl font-medium text-white">
            Dashboard webapp with{" "}
            <a
              href="https://react.dev/"
              className="text-purple-400 no-underline hover:underline"
              target="_blank"
            >
              React.js
            </a>
          </div>
          <div className="mt-2 text-center text-3xl font-bold text-gray-200">
            Access Your Dashboard
          </div>
        </div>
        <div className="mx-auto mt-5 w-full max-w-md rounded-sm border border-gray-300 bg-gray-800/30 p-8 shadow-xl/35">
          {errorMessage && (
            <div className="mb-4 rounded-md bg-red-500/20 p-3 text-center text-sm font-semibold text-red-300">
              {errorMessage}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-bold text-gray-100"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                {...register("userName", { required: "Username is required." })}
                className="mt-1 w-full rounded border border-gray-300 p-2 text-white focus:bg-gray-200/10"
              />
              {errors.userName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-bold text-gray-100"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required." })}
                className="mt-1 w-full rounded border border-gray-300 p-2 text-white focus:bg-gray-200/10"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                {isLoading ? "Signing in..." : "Sign In to Your Account"}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="" className="block text-sm text-gray-100">
                  New to our platform?
                </label>
              </div>
              <div>
                <Link
                  to="/register"
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

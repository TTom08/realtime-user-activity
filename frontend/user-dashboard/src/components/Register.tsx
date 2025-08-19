import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

interface RegisterFormData {
  fullName: string;
  userName: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (formData) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          username: formData.userName,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("Username already exists.");
        }
        throw new Error(`Registration failed with status: ${response.status}`);
      }

      const result = await response.text();
      console.log("Registration successful: ", result);

      navigate("/");
    } catch (error) {
      console.error("Error during registration: ", error);
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
            Create Your Account
          </div>
        </div>
        <div className="mx-auto mt-5 w-full max-w-md rounded-sm border border-gray-300 bg-gray-800/30 p-8 shadow-xl/35">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-bold text-gray-100"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                {...register("fullName", {
                  required: "Full name is required.",
                })}
                className="mt-1 w-full rounded border border-gray-300 p-2 text-white focus:bg-gray-200/10"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="userName"
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
                htmlFor="password"
                className="block text-sm font-bold text-gray-100"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                })}
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
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="" className="block text-sm text-gray-100">
                  Already have an account?
                </label>
              </div>
              <div>
                <Link
                  to="/"
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

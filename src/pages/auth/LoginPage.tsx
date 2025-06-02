import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormInputs } from "../../types/auth";
import { authService } from "../../api/auth";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { LOGIN_MUTATION } from "../../qraphql/mutations";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useManufacturer } from "../../context/ManufacturerContext";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();
  const { saveManufacturer } = useManufacturer();
  const [login, { loading: isLoading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.logIn.token) {
        authService.setToken(data.logIn.token);
        localStorage.removeItem("userId");
        localStorage.setItem("userId", data.logIn.user.id);
        saveManufacturer(data?.logIn?.user?.manufacturers[0].id || "");
        navigate("/dashboard/main");
        toast("Successfully logged in");
      }
    },
    onError: (error) => {
      setError("root", {
        type: "server",
        message: error.message || "Invalid credentials",
      });
    },
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="absolute top-2 left-7">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-gray-900 mb-2 cursor-pointer"
        >
          n<span className="text-bg-active">i</span>bo
          <span className="text-bg-active">.</span>
        </h1>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-3 bg-white">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-500 mb-4 hover:text-gray-700 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
          </button>

          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Login to your account
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Welcome to Nibo! Come on in to continue make your products more
            accessible
          </p>

          {errors.root && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-pink-500 focus:border-pink-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                  },
                })}
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-pink-500 focus:border-pink-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-3 w-full px-4 py-2 bg-pink-500 text-white font-semibold rounded-md shadow-sm hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed"
            >
              {isLoading && <LoadingSpinner size="sm" />}
              {!isLoading ? "Log In" : "Logging in.."}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Forgot your password?
              <Link
                to="/reset"
                className="text-pink-500 hover:underline font-medium"
              >
                {" "}
                Reset
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
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
        saveManufacturer(data.logIn.user.manufacturers[0].id);
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

  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex justify-center items-center h-screen bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <h2 className="text-2xl font-semibold mb-4 text-center">Log in</h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome to Nibo! Come on in to continue making your products more
          accessible.
        </p>
        <p className="font-light tracking-tighter">
          Don't have an account{" "}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Sign Up
          </Link>
        </p>
        {errors.root && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {errors.root.message}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`mt-1 block w-full border rounded p-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
              })}
              className={`mt-1 block w-full border rounded p-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-right mb-4">
          <Link
            to="/forgotpassword"
            className="text-pink-500 hover:underline text-sm"
          >
            Reset Password
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded disabled:bg-pink-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Logging in...
            </div>
          ) : (
            "Log in"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

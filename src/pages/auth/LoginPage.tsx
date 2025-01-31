import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

const userDetails: LoginFormInputs = {
  email: "test@gmail.com",
  password: "Password1234",
};
const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    if (
      data.email === userDetails.email &&
      data.password === userDetails.password
    ) {
      setTimeout(() => navigate("/dashboard"), 1200);
    } else {
      setError(true);
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
            {...register("email", { required: "Email is required" })}
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
              {...register("password", { required: "Password is required" })}
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
          <a href="/reset" className="text-pink-500 hover:underline text-sm">
            Reset
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded"
        >
          Log in
        </button>
        {error && (
          <p className="text-red-500 text-lg mt-1">
            The password or email you provided is incorrect
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;

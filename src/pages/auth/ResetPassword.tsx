import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  return (
    <>
      <div className="absolute top-2 left-7">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          n<span className="text-bg-active">i</span>bo
          <span className="text-bg-active">.</span>
        </h1>
      </div>
      <div className="flex p-3 justify-center min-h-screen">
        <div className="w-full max-w-md p-3 bg-white">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 mb-4 hover:text-gray-700 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
          </button>

          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Reset Password
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Reset your account password and access your business account again
          </p>

          <form className="space-y-4">
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-pink-500 focus:border-pink-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter your Password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-pink-500 focus:border-pink-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-pink-500 text-white font-semibold rounded-md shadow-sm hover:bg-pink-600"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

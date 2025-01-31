import React from "react";

const AuthPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            n<span className="text-bg-active">i</span>bo
            <span className="text-bg-active">.</span>
          </h1>
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Welcome to Nibo! 👋
          </h2>
          <p className="text-gray-500 mb-6">
            Protect your brand integrity and increase sales for your products
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100"
          >
            <img
              src="/google-image.webp"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Sign Up with Google
          </button>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-300"></div>
            <span className="bg-white px-2 text-gray-500 z-20">OR</span>
          </div>

          <button
            type="button"
            className="w-full px-4 py-2 bg-pink-500 text-white font-semibold rounded-md shadow-sm hover:bg-pink-600"
          >
            Create an Account
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            I already have an account?{" "}
            <a
              href="/login"
              className="text-pink-500 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

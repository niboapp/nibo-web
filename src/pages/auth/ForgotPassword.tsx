import { ArrowLeft } from "lucide-react";

const ForgotPassword: React.FC = () => {
  return (
    <>
      <div className="absolute top-6 left-7">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          n<span className="text-bg-active">i</span>bo
          <span className="text-bg-active">.</span>
        </h1>
      </div>
      <div className="flex p-5 justify-center min-h-screen">
        <div className="w-full max-w-md p-3 bg-white ">
          <button className="text-gray-500 mb-4 hover:text-gray-700 flex items-center">
            <ArrowLeft className="w-5 h-5 mr-1" />
          </button>

          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Reset your account password and access your business account again
          </p>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-pink-500 text-white font-semibold rounded-md shadow-sm hover:bg-pink-600"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

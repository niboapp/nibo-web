import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const VerificationCode: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entered OTP:", otp.join(""));
    // Handle OTP submission logic
  };

  return (
    <>
      <div className="absolute top-6 left-7">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          n<span className="text-bg-active">i</span>bo
          <span className="text-bg-active">.</span>
        </h1>
      </div>
      <div className="flex justify-center p-4 min-h-screen">
        <div className="w-full max-w-md p-6 bg-white ">
          <button className="text-gray-500 mb-4 hover:text-gray-700 flex items-center">
            <ArrowLeft className="w-5 h-5 mr-1" />
          </button>

          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Verification Code
          </h2>
          <p className="text-gray-500 text-center mb-6">
            We have sent the OTP code to{" "}
            <span className="text-pink-500 font-medium">
              johndoe@manufacturer.com
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  maxLength={1}
                  autoComplete="off"
                />
              ))}
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

export default VerificationCode;

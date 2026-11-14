"use client";
import { useState } from "react";
import { VerifyEmailAction } from "@/lib/actions/authActions";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle forgot password logic here
    const user = await VerifyEmailAction(email);
    if (user) {
      // Handle successful email verification
    } else {
      return "User not found";
    }
  };
  return (
    <main className="min-h-screen bg-[#f5f5f6] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white px-8 py-10 shadow-sm">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Forgot Password?
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email to reset your password
          </p>
        </div>

        {/* Email Form */}
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#ff3f6c]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff3f6c] py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#e7335f]"
          >
            Continue
          </button>
        </form>

        {/* Back to Sign In */}
        <p className="mt-7 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <span className="font-semibold text-[#ff3f6c] cursor-pointer">
            Sign In
          </span>
        </p>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;

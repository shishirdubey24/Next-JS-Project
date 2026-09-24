"use client";

import { VerifyEmailAction } from "@/lib/actions/authActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
const IdentifyUser = () => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const router = useRouter();
  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userResponse = await VerifyEmailAction(email);
      setResponseMessage(userResponse.message);
      setTimeout(() => {
        if (userResponse.exists == false) {
          router.push("/sign-up");
        } else {
          router.push("/sign-in");
        }
      }, 1000);
    } catch (error) {
      console.error("Email verification failed:", error);
      setResponseMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f6] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white px-8 py-10 shadow-sm">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome</h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email to continue
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleContinue} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
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
          {responseMessage && (
            <p className="text-center text-sm text-gray-600">
              {" "}
              {responseMessage}{" "}
            </p>
          )}
        </form>
      </div>
    </main>
  );
};

export default IdentifyUser;

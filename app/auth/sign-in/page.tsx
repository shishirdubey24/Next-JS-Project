"use client";
import { useState } from "react";
 import type { SignInData } from "@/types/auth";
import { LoginAction } from "@/lib/actions/authActions";
import { useAuthStore } from "@/lib/store/useAuthStore";
const SignInPage = ()=>{
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await LoginAction(formData);
      if (!response.success) {
        setError(response.message);
        return;
      }
      setAuth({ name: response.name, email: response.email });
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#f5f5f6] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white px-8 py-10 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleForm}>
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
              value={formData.email}
              onChange={handleData}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#ff3f6c]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleData}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#ff3f6c]"
            />
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ff3f6c] py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#e7335f]"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignInPage;

"use client";
import { useState } from "react";
import type { SignUpData } from "@/types/auth";
import { RegisterAction } from "@/lib/actions/authActions";
import { useAuthStore } from "@/lib/store/useAuthStore";
const SignUpPage = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleformData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: value,
    //   }));
    // };
    setFormData({ ...formData, [name]: value });
  };
  // form submission handler
  const handleForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    try {
      const response = await RegisterAction(formData);

      if (!response.success) {
        console.error("Registration failed:", response.message);
        return;
      }

      const user = { name: response.name, email: response.email };
      setAuth(user);
      console.log("Authenticated user:", user);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <main className="min-h-screen bg-[#f5f5f6] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white px-8 py-10 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Create Account
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Sign up to continue shopping
        </p>

        <form className="space-y-5" onSubmit={handleForm}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#ff3f6c]"
              name="name"
              value={formData.name}
              onChange={handleformData}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#ff3f6c]"
              name="email"
              value={formData.email}
              onChange={handleformData}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#ff3f6c]"
              name="phone"
              value={formData.phone}
              onChange={handleformData}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#ff3f6c]"
              name="password"
              value={formData.password}
              onChange={handleformData}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#ff3f6c] py-3 text-sm font-semibold text-white hover:bg-[#ff527b] transition-colors cursor-pointer"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span className="font-semibold text-[#ff3f6c] cursor-pointer">
            Sign In
          </span>
        </p>
      </div>
    </main>
  );
};
export default SignUpPage;

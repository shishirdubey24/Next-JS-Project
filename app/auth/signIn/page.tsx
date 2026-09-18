"use client";
import { useState } from "react";
import type { signIn } from "@/types/authTypes";
const SignInPage = (props: signIn) => {
  const [formdata, setFormData] = useState({
    email: props.email,
    password: props.password,
  });

  const handleformData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  return (
    <main className="min-h-screen bg-[#f5f5f6] flex items-center justify-center px-4 py-10">
      {" "}
      <div className="w-full max-w-md bg-white px-8 py-10 shadow-sm">
        {" "}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {" "}
          Welcome Back{" "}
        </h1>{" "}
        <p className="text-sm text-gray-500 mb-8">
          {" "}
          Sign in to continue shopping{" "}
        </p>{" "}
        <form className="space-y-5">
          {" "}
          {/* Email */}{" "}
          <div>
            {" "}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {" "}
              Email{" "}
            </label>{" "}
            <input
              id="email"
              name="email"
              type="email"
              value={formdata.email}
              onChange={handleformData}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#ff3f6c]"
            />{" "}
          </div>{" "}
          {/* Password */}{" "}
          <div>
            {" "}
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {" "}
              Password{" "}
            </label>{" "}
            <input
              id="password"
              name="password"
              type="password"
              value={formdata.password}
              onChange={handleformData}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#ff3f6c]"
            />{" "}
          </div>{" "}
          {/* Forgot Password */}{" "}
          <div className="text-right">
            {" "}
            <button
              type="button"
              className="text-sm font-medium text-[#ff3f6c]"
            >
              {" "}
              Forgot Password?{" "}
            </button>{" "}
          </div>{" "}
          {/* Submit */}{" "}
          <button
            type="submit"
            className="w-full bg-[#ff3f6c] py-3 text-sm font-semibold text-white hover:bg-[#ff527b] transition-colors cursor-pointer"
          >
            {" "}
            SIGN IN{" "}
          </button>{" "}
        </form>{" "}
        <p className="mt-7 text-center text-sm text-gray-500">
          {" "}
          Don`t have an account?{" "}
          <span className="font-semibold text-[#ff3f6c] cursor-pointer">
            {" "}
            Sign Up{" "}
          </span>{" "}
        </p>{" "}
      </div>{" "}
    </main>
  );
};

const ResetPasswordPage = () => {
  return (
    <main className="min-h-screen bg-[#f5f5f6] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white px-8 py-10 shadow-sm">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create a new password for your account
          </p>
        </div>

        {/* Password Form */}
        <form className="space-y-5">
          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              New Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter new password"
              required
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#ff3f6c]"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              required
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#ff3f6c]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#ff3f6c] py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#e7335f]"
          >
            Reset Password
          </button>
        </form>

        {/* Footer */}
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

export default ResetPasswordPage;

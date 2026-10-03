"use client";

import { LogoutAction } from "@/lib/actions/logoutAction";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const router = useRouter();

  const handleLogout = async () => {
    const result = await LogoutAction();

    if (result.success) {
      // Clear client-side authentication state
      clearAuth();

      // Go back to home page
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f6] py-10">
      <div className="mx-auto w-full max-w-4xl px-4">
        {/* Profile Header */}
        <div className="mb-6 bg-white px-6 py-8 text-center">
          {/* Profile Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#ff3f6c]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.7"
              className="h-10 w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
              />
            </svg>
          </div>

          {/* User Email */}
          <p className="mt-4 text-sm font-medium text-gray-700">
            {user?.email}
          </p>
        </div>

        {/* Profile Options */}
        <div className="overflow-hidden bg-white">
          {/* Account */}
          <div className="flex cursor-pointer items-center justify-between border-b border-gray-200 px-6 py-6 transition hover:bg-gray-50">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-800">
                Account
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your personal information and account details
              </p>
            </div>

            <span className="text-xl text-gray-400">→</span>
          </div>

          {/* Orders */}
          <div className="flex cursor-pointer items-center justify-between border-b border-gray-200 px-6 py-6 transition hover:bg-gray-50">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-800">
                Orders
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Track your orders and view your order history
              </p>
            </div>

            <span className="text-xl text-gray-400">→</span>
          </div>

          {/* Payments */}
          <div className="flex cursor-pointer items-center justify-between border-b border-gray-200 px-6 py-6 transition hover:bg-gray-50">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-800">
                Payments
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your payment methods and transactions
              </p>
            </div>

            <span className="text-xl text-gray-400">→</span>
          </div>

          {/* Wishlist */}
          <div className="flex cursor-pointer items-center justify-between border-b border-gray-200 px-6 py-6 transition hover:bg-gray-50">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-800">
                Wishlist
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage the products you have saved
              </p>
            </div>

            <span className="text-xl text-gray-400">→</span>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-between px-6 py-6 text-left transition hover:bg-gray-50"
          >
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-red-600">
                Logout
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Sign out from your current session
              </p>
            </div>

            <span className="text-xl text-gray-400">→</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

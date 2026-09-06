import Link from "next/link";
import { User, ShoppingBag } from "lucide-react";
import { SubmitSearchBox } from "../components/submitSearchBox";

export const Header = () => {
  const navItems = ["MEN", "WOMEN", "KIDS", "HOME & LIVING", "BEAUTY", "STUDIO"];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto flex min-h-16 flex-wrap items-center gap-3 px-4 py-3 lg:h-20 lg:flex-nowrap lg:gap-10 lg:px-6 lg:py-0">
        <Link href="/" className="shrink-0 hover:opacity-90 transition-opacity no-underline ml-0 lg:ml-2 xl:ml-4">
          <h1 className="text-2xl font-bold text-black sm:text-3xl">Trend-Wired</h1>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((label) => (
            <span key={label} className="text-sm font-semibold text-black uppercase tracking-wide hover:text-gray-700 cursor-pointer">
              {label}
            </span>
          ))}
        </nav>

        <div className="order-3 basis-full lg:order-none lg:flex-1 lg:min-w-0 lg:basis-auto">
          <div className="flex items-center bg-[#f5f5f6] border border-gray-300 rounded-md overflow-hidden">
            <SubmitSearchBox />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4 sm:gap-6 lg:ml-0">
          <Link href="/Account" className="flex flex-col items-center text-black hover:text-gray-700 no-underline">
            <User size={20} />
            <span className="text-xs hidden sm:block">Profile</span>
          </Link>
          <Link href="/bag" className="relative flex flex-col items-center text-black hover:text-gray-700 no-underline">
            <ShoppingBag size={20} />
            <span className="text-xs hidden sm:block">Bag</span>
            <span className="absolute -top-1 -right-2 h-5 px-1 min-w-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full" />
          </Link>
        </div>
      </div>

      <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-2">
        <nav className="flex gap-4 overflow-x-auto">
          {navItems.map((label) => (
            <span key={label} className="text-xs font-semibold uppercase text-black whitespace-nowrap hover:text-gray-700">
              {label}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
};

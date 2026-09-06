"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SubmitSearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const submitSearch = () => {
    const q = searchInput.trim();

    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };
  return (
    <>
      <button
        aria-label="Search"
        onClick={submitSearch}
        className="px-4 h-10 text-gray-700 hover:text-black"
      >
        <Search size={18} />
      </button>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submitSearch()}
        placeholder="Search...!"
        className="w-full h-10 px-3 text-sm bg-[#f5f5f6] focus:outline-none text-black placeholder:text-gray-500"
      />
    </>
  );
};

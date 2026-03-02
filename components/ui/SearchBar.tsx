"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  /** Placeholder text */
  placeholder?: string;
  /** Tailwind class overrides */
  className?: string;
}

/**
 * Client component — debounces the search query and pushes it into the URL
 * as `?q=...`. Works with the /search page and any page that reads `q`.
 */
export default function SearchBar({
  placeholder = "Search builds…",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialise from URL so the input is pre-filled on page load
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Push updated query param after user stops typing (300 ms debounce)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }

      // Navigate to /search when on any other page; stay otherwise
      const target = pathname === "/search" ? pathname : "/search";
      router.push(`${target}?${params.toString()}`);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      {/* Search icon */}
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-rose-400">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </span>

      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-blossom-200 bg-white py-2.5 pl-10 pr-4 text-sm text-rose-950 placeholder-rose-400 outline-none ring-0 transition focus:border-blossom-400 focus:ring-1 focus:ring-blossom-400"
        aria-label="Search builds"
      />
    </div>
  );
}

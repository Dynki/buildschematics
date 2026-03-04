import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";
import { Suspense } from "react";

/**
 * Site-wide navigation bar — server component wrapper,
 * SearchBar is client-only (needs Suspense for useSearchParams).
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-blossom-200 bg-cream-100/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-rose-950 transition hover:text-blossom-600"
        >
          <span className="text-2xl" aria-hidden="true">
            🌸
          </span>
          <span>
            Build<span className="text-blossom-400">Schematics</span>
          </span>
        </Link>

        {/* Nav links — hidden on small screens */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/builds/castles">Structures</NavLink>
          <NavLink href="/styles/medieval">Styles</NavLink>
          <NavLink href="/search">Browse All</NavLink>
        </nav>

        {/* Search bar — takes remaining space */}
        <div className="ml-auto w-full max-w-xs">
          <Suspense fallback={<div className="h-9 w-full rounded-lg bg-cream-200 animate-pulse" />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

// ─── Sub-component ────────────────────────────────────────────

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-1.5 text-sm font-medium text-rose-800 transition hover:bg-cream-200 hover:text-blossom-600"
    >
      {children}
    </Link>
  );
}

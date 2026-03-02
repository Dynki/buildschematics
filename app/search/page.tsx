import type { Metadata } from "next";
import { Suspense } from "react";
import BuildCard from "@/components/build/BuildCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import SearchBar from "@/components/ui/SearchBar";
import { filterBuilds } from "@/lib/utils";
import type { AestheticStyle, Difficulty, StructureCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Search Builds",
  description: "Search and filter all Minecraft build tutorials on BlockBlueprints.",
};

interface PageProps {
  searchParams: {
    q?: string;
    style?: string;
    structure?: string;
    difficulty?: string;
    survivalFriendly?: string;
    page?: string;
  };
}

const PAGE_SIZE = 12;

/**
 * Search page — server component.
 * The SearchBar is client-only (handles debounced input); filtering is server-side.
 */
export default function SearchPage({ searchParams }: PageProps) {
  // Parse all URL filter params
  const q = searchParams.q ?? "";
  const style = searchParams.style as AestheticStyle | undefined;
  const structure = searchParams.structure as StructureCategory | undefined;
  const difficulty = searchParams.difficulty as Difficulty | undefined;
  const survivalFriendly =
    searchParams.survivalFriendly === "true"
      ? true
      : searchParams.survivalFriendly === "false"
        ? false
        : undefined;
  const page = Math.max(1, Number(searchParams.page ?? 1));

  // Server-side filter
  const results = filterBuilds({ q, style, structure, difficulty, survivalFriendly });
  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  const paginated = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasFilters = !!(q || style || structure || difficulty || survivalFriendly !== undefined);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-blossom-600">Browse All Builds</h1>
        <p className="mt-1 text-rose-700/60">
          {results.length} build{results.length !== 1 ? "s" : ""} found
          {q ? ` for "${q}"` : ""}
        </p>
      </div>

      {/* Full-width search bar at top of results */}
      <Suspense fallback={<div className="h-11 animate-pulse rounded-lg bg-cream-200" />}>
        <SearchBar
          placeholder="Search by title, style, material…"
          className="max-w-2xl"
        />
      </Suspense>

      {/* Layout: sidebar + grid */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filter sidebar */}
        <Suspense fallback={<div className="h-64 w-56 animate-pulse rounded-xl bg-cream-200" />}>
          <FilterSidebar show={["structure", "style", "difficulty", "survival"]} />
        </Suspense>

        {/* Results grid */}
        <div className="flex-1">
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-blossom-200 py-20 text-center">
              <span className="mb-3 text-4xl">🔍</span>
              <p className="text-lg font-medium text-rose-800">
                {hasFilters ? "No builds match your filters" : "No builds yet"}
              </p>
              <p className="mt-1 text-sm text-rose-500">
                {hasFilters
                  ? "Try widening your search or removing some filters"
                  : "Check back soon!"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((build) => (
                  <BuildCard key={build.id} build={build} />
                ))}
              </div>

              {/* Simple link-based pagination */}
              {totalPages > 1 && (
                <nav className="mt-10 flex justify-center gap-2" aria-label="Pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                    const { page: _page, ...rest } = searchParams as Record<string, string>;
                    const href = `/search?${new URLSearchParams({ ...rest, page: String(p) })}`;
                    return (
                      <a
                        key={p}
                        href={href}
                        className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm transition ${
                          p === page
                            ? "border-blossom-500 bg-blossom-600 font-semibold text-white"
                            : "border-blossom-200 bg-white text-rose-700 hover:border-blossom-400 hover:text-blossom-600"
                        }`}
                        aria-current={p === page ? "page" : undefined}
                      >
                        {p}
                      </a>
                    );
                  })}
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

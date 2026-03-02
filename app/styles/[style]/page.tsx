import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BuildCard from "@/components/build/BuildCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { styleCategories } from "@/lib/data";
import { filterBuilds, slugToStyle } from "@/lib/utils";
import type { Difficulty, StructureCategory } from "@/lib/types";

// ─── Static params ────────────────────────────────────────────

export function generateStaticParams() {
  return styleCategories.map((cat) => ({ style: cat.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { style: string };
}): Promise<Metadata> {
  const style = slugToStyle(params.style);
  if (!style) return {};

  const meta = styleCategories.find((c) => c.label === style);

  return {
    title: `${style} Builds`,
    description: `Browse all ${style.toLowerCase()} style Minecraft build tutorials. ${meta?.description ?? ""}`,
    openGraph: {
      title: `${style} Style Builds | BlockBlueprints`,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────

interface PageProps {
  params: { style: string };
  searchParams: {
    structure?: string;
    difficulty?: string;
    survivalFriendly?: string;
    page?: string;
  };
}

const PAGE_SIZE = 9;

/**
 * Style category page — server component.
 * Filtering performed server-side from URL search params.
 */
export default function StylePage({ params, searchParams }: PageProps) {
  const style = slugToStyle(params.style);
  if (!style) notFound();

  const meta = styleCategories.find((c) => c.label === style);

  // Parse filters
  const structure = searchParams.structure as StructureCategory | undefined;
  const difficulty = searchParams.difficulty as Difficulty | undefined;
  const survivalFriendly =
    searchParams.survivalFriendly === "true"
      ? true
      : searchParams.survivalFriendly === "false"
        ? false
        : undefined;
  const page = Math.max(1, Number(searchParams.page ?? 1));

  const filtered = filterBuilds({ style, structure, difficulty, survivalFriendly });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-3xl" aria-hidden="true">
            {meta?.emoji}
          </span>
          <h1 className="text-3xl font-bold text-blossom-600">{style}</h1>
        </div>
        <p className="mt-1 text-rose-700/60">
          {filtered.length} build{filtered.length !== 1 ? "s" : ""} found
          {structure ? ` · Structure: ${structure}` : ""}
          {difficulty ? ` · ${difficulty}` : ""}
          {survivalFriendly ? " · Survival Friendly" : ""}
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <Suspense fallback={<div className="h-64 w-56 animate-pulse rounded-xl bg-cream-200" />}>
          <FilterSidebar show={["structure", "difficulty", "survival"]} />
        </Suspense>

        <div className="flex-1">
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-blossom-200 py-20 text-center">
              <span className="mb-3 text-4xl">🔍</span>
              <p className="text-lg font-medium text-rose-800">No builds found</p>
              <p className="mt-1 text-sm text-rose-500">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((build) => (
                  <BuildCard key={build.id} build={build} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="mt-10 flex justify-center gap-2" aria-label="Pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                    const { page: _page, ...rest } = searchParams as Record<string, string>;
                    const href = `/styles/${params.style}?${new URLSearchParams({ ...rest, page: String(p) })}`;
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

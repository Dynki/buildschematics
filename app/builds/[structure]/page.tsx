import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BuildCard from "@/components/build/BuildCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { structureCategories } from "@/lib/data";
import { filterBuilds, slugToStructure } from "@/lib/utils";
import type { AestheticStyle, Difficulty } from "@/lib/types";

// ─── Static params ────────────────────────────────────────────

export function generateStaticParams() {
  return structureCategories.map((cat) => ({ structure: cat.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { structure: string };
}): Promise<Metadata> {
  const structure = slugToStructure(params.structure);
  if (!structure) return {};

  const meta = structureCategories.find((c) => c.label === structure);

  return {
    title: `${structure} Builds`,
    description: `Browse all ${structure.toLowerCase()} Minecraft build tutorials. ${meta?.description ?? ""}`,
    openGraph: {
      title: `${structure} Builds | BlockBlueprints`,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────

interface PageProps {
  params: { structure: string };
  searchParams: {
    style?: string;
    difficulty?: string;
    survivalFriendly?: string;
    page?: string;
  };
}

const PAGE_SIZE = 9;

/**
 * Structure category page — server component.
 * Filtering is performed server-side from URL search params.
 */
export default function StructurePage({ params, searchParams }: PageProps) {
  // Resolve slug → typed category
  const structure = slugToStructure(params.structure);
  if (!structure) notFound();

  const meta = structureCategories.find((c) => c.label === structure);

  // Build filters from URL params (server-side)
  const style = searchParams.style as AestheticStyle | undefined;
  const difficulty = searchParams.difficulty as Difficulty | undefined;
  const survivalFriendly =
    searchParams.survivalFriendly === "true"
      ? true
      : searchParams.survivalFriendly === "false"
        ? false
        : undefined;
  const page = Math.max(1, Number(searchParams.page ?? 1));

  const filtered = filterBuilds({ structure, style, difficulty, survivalFriendly });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-8">
      {/* ─── Page header ──────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-3xl" aria-hidden="true">
            {meta?.emoji}
          </span>
          <h1 className="text-3xl font-bold text-blossom-600">{structure}</h1>
        </div>
        <p className="mt-1 text-rose-700/60">
          {filtered.length} build{filtered.length !== 1 ? "s" : ""} found
          {style ? ` · Style: ${style}` : ""}
          {difficulty ? ` · ${difficulty}` : ""}
          {survivalFriendly ? " · Survival Friendly" : ""}
        </p>
      </div>

      {/* ─── Layout: sidebar + grid ───────────────────────── */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar — wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<div className="h-64 w-56 animate-pulse rounded-xl bg-cream-200" />}>
          <FilterSidebar show={["style", "difficulty", "survival"]} />
        </Suspense>

        {/* Build grid */}
        <div className="flex-1">
          {paginated.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((build) => (
                  <BuildCard key={build.id} build={build} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <PaginationLinks
                  page={page}
                  totalPages={totalPages}
                  basePath={`/builds/${params.structure}`}
                  searchParams={searchParams as Record<string, string>}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-blossom-200 py-20 text-center">
      <span className="mb-3 text-4xl">🔍</span>
      <p className="text-lg font-medium text-rose-800">No builds found</p>
      <p className="mt-1 text-sm text-rose-500">
        Try adjusting your filters
      </p>
    </div>
  );
}

function PaginationLinks({
  page,
  totalPages,
  basePath,
  searchParams,
}: {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams: Record<string, string>;
}) {
  // Import-free pagination to keep this a server component
  const { page: _page, ...rest } = searchParams;

  function href(p: number) {
    const params = new URLSearchParams({ ...rest, page: String(p) });
    return `${basePath}?${params.toString()}`;
  }

  return (
    <nav className="mt-10 flex justify-center gap-2" aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <a
          key={p}
          href={href(p)}
          className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm transition ${
            p === page
              ? "border-blossom-500 bg-blossom-600 font-semibold text-white"
              : "border-blossom-200 bg-white text-rose-700 hover:border-blossom-400 hover:text-blossom-600"
          }`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </a>
      ))}
    </nav>
  );
}

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Base path for pagination links, e.g. "/builds/castles" */
  basePath: string;
  /** Existing search params to preserve (style, difficulty, etc.) */
  searchParams?: Record<string, string>;
}

/**
 * Server-rendered pagination component.
 * Generates proper href links — no JS required.
 */
export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams({
      ...searchParams,
      page: String(page),
    });
    return `${basePath}?${params.toString()}`;
  }

  // Show at most 5 page numbers around the current page
  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-blossom-200 bg-white text-sm text-rose-700 transition hover:border-blossom-400 hover:text-blossom-600"
          aria-label="Previous page"
        >
          ‹
        </Link>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-cream-300 text-sm text-rose-300 cursor-not-allowed">
          ‹
        </span>
      )}

      {/* Page numbers */}
      {pages.map((p, idx) =>
        p === "…" ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-rose-400"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm transition ${
              p === currentPage
                ? "border-blossom-500 bg-blossom-600 font-semibold text-white"
                : "border-blossom-200 bg-white text-rose-700 hover:border-blossom-400 hover:text-blossom-600"
            }`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-blossom-200 bg-white text-sm text-rose-700 transition hover:border-blossom-400 hover:text-blossom-600"
          aria-label="Next page"
        >
          ›
        </Link>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-cream-300 text-sm text-rose-300 cursor-not-allowed">
          ›
        </span>
      )}
    </nav>
  );
}

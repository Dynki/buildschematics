"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { AestheticStyle, Difficulty, StructureCategory } from "@/lib/types";

// ─── Constants ───────────────────────────────────────────────

const DIFFICULTIES: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

const STYLES: AestheticStyle[] = [
  "Gothic",
  "Medieval",
  "Modern",
  "Cottagecore",
  "Fantasy",
  "Desert",
  "Snow",
];

const STRUCTURES: StructureCategory[] = [
  "Castles",
  "Houses",
  "Villages",
  "Mega Builds",
  "Farms",
];

interface FilterSidebarProps {
  /**
   * Which filters to display. Omit 'structure' when already on a structure
   * page; omit 'style' when already on a style page.
   */
  show?: ("style" | "difficulty" | "survival" | "structure")[];
}

/**
 * Filter sidebar — client component.
 * Reads and writes filter state via URL search params (no client state needed).
 * All filtering logic remains server-side; the sidebar just updates the URL.
 */
export default function FilterSidebar({
  show = ["style", "difficulty", "survival"],
}: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** Set (or clear) a single search param and navigate. */
  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    // Reset page when filters change
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function getParam(key: string) {
    return searchParams.get(key) ?? "";
  }

  const activeStyle = getParam("style") as AestheticStyle | "";
  const activeDifficulty = getParam("difficulty") as Difficulty | "";
  const activeSurvival = getParam("survivalFriendly");
  const activeStructure = getParam("structure") as StructureCategory | "";

  return (
    <aside className="w-full space-y-6 lg:w-56 lg:shrink-0">
      <div className="rounded-xl border border-blossom-200 bg-white p-4">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-rose-400">
          Filters
        </h2>

        {/* ── Style filter ── */}
        {show.includes("style") && (
          <FilterSection title="Style">
            <FilterPill
              active={activeStyle === ""}
              onClick={() => setParam("style", null)}
            >
              All
            </FilterPill>
            {STYLES.map((s) => (
              <FilterPill
                key={s}
                active={activeStyle === s}
                onClick={() =>
                  setParam("style", activeStyle === s ? null : s)
                }
              >
                {s}
              </FilterPill>
            ))}
          </FilterSection>
        )}

        {/* ── Structure filter ── */}
        {show.includes("structure") && (
          <FilterSection title="Structure">
            <FilterPill
              active={activeStructure === ""}
              onClick={() => setParam("structure", null)}
            >
              All
            </FilterPill>
            {STRUCTURES.map((s) => (
              <FilterPill
                key={s}
                active={activeStructure === s}
                onClick={() =>
                  setParam("structure", activeStructure === s ? null : s)
                }
              >
                {s}
              </FilterPill>
            ))}
          </FilterSection>
        )}

        {/* ── Difficulty filter ── */}
        {show.includes("difficulty") && (
          <FilterSection title="Difficulty">
            <FilterPill
              active={activeDifficulty === ""}
              onClick={() => setParam("difficulty", null)}
            >
              All
            </FilterPill>
            {DIFFICULTIES.map((d) => (
              <FilterPill
                key={d}
                active={activeDifficulty === d}
                onClick={() =>
                  setParam("difficulty", activeDifficulty === d ? null : d)
                }
              >
                {d}
              </FilterPill>
            ))}
          </FilterSection>
        )}

        {/* ── Survival friendly toggle ── */}
        {show.includes("survival") && (
          <FilterSection title="Mode">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-rose-800">
              <span
                role="checkbox"
                aria-checked={activeSurvival === "true"}
                tabIndex={0}
                onClick={() =>
                  setParam(
                    "survivalFriendly",
                    activeSurvival === "true" ? null : "true"
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setParam(
                      "survivalFriendly",
                      activeSurvival === "true" ? null : "true"
                    );
                }}
                className={`h-4 w-4 rounded border transition ${
                  activeSurvival === "true"
                    ? "border-blossom-500 bg-blossom-600"
                    : "border-blossom-200 bg-cream-50"
                }`}
              >
                {activeSurvival === "true" && (
                  <svg
                    className="h-full w-full text-white"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8l3.5 3.5L13 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              Survival Friendly
            </label>
          </FilterSection>
        )}

        {/* Clear all */}
        {(activeStyle || activeDifficulty || activeSurvival || activeStructure) && (
          <button
            onClick={() => router.push(pathname)}
            className="mt-2 w-full rounded-md border border-blossom-200 py-1.5 text-xs text-rose-500 transition hover:border-red-400 hover:text-red-500"
          >
            Clear all filters
          </button>
        )}
      </div>
    </aside>
  );
}

// ─── Local sub-components ────────────────────────────────────

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-rose-400">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
        active
          ? "bg-blossom-600 text-white"
          : "border border-blossom-200 bg-cream-50 text-rose-700 hover:border-blossom-400 hover:text-blossom-600"
      }`}
    >
      {children}
    </button>
  );
}

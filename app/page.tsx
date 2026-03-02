import type { Metadata } from "next";
import Link from "next/link";
import BuildCard from "@/components/build/BuildCard";
import CategoryCard from "@/components/build/CategoryCard";
import { structureCategories, styleCategories } from "@/lib/data";
import { getFeaturedBuilds } from "@/lib/utils";

export const metadata: Metadata = {
  title: "BlockBlueprints — Minecraft Build Tutorials",
  description:
    "Browse hundreds of Minecraft build tutorials sorted by structure type and aesthetic style. Castles, cottages, mega builds and more.",
  openGraph: {
    title: "BlockBlueprints — Minecraft Build Tutorials",
    description:
      "The ultimate Minecraft build tutorial library. From gothic castles to cozy cottages.",
    images: [{ url: "https://picsum.photos/seed/bb-og/1200/630" }],
  },
};

/**
 * Homepage — server component.
 * Showcases structure categories, style categories, and featured builds.
 */
export default function HomePage() {
  const featured = getFeaturedBuilds(4);

  return (
    <div className="space-y-20">
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative -mx-4 -mt-8 overflow-hidden bg-gradient-to-br from-blossom-100 via-cream-200 to-cream-100 px-4 py-20 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {/* Pixel grid background overlay */}
        <div className="bg-pixel-grid absolute inset-0 opacity-40" />

        {/* Blossom pink radial glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blossom-300/30 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blossom-300 bg-white/70 px-4 py-1.5 text-sm text-blossom-600">
            <span aria-hidden="true">🌸</span>
            Minecraft Build Tutorials
          </div>

          <h1 className="mb-6 text-4xl font-bold text-rose-950 sm:text-5xl lg:text-6xl">
            Build anything in{" "}
            <span className="text-blossom-600">Minecraft</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-rose-800/70">
            Step-by-step tutorials for every build style — from cozy cottages
            to towering gothic castles. Filter by structure, style, difficulty,
            and more.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/search"
              className="rounded-lg bg-blossom-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blossom-200 transition hover:bg-blossom-500"
            >
              Browse All Builds
            </Link>
            <Link
              href="/search?difficulty=Beginner"
              className="rounded-lg border border-blossom-300 bg-white/60 px-6 py-3 text-sm font-semibold text-rose-800 transition hover:border-blossom-500 hover:text-blossom-600"
            >
              Beginner Friendly
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Structure categories ──────────────────────────── */}
      <section>
        <SectionHeader
          title="Browse by Structure"
          subtitle="Find tutorials by what you want to build"
          href="/search"
        />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {structureCategories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} type="structure" />
          ))}
        </div>
      </section>

      {/* ─── Style categories ─────────────────────────────── */}
      <section>
        <SectionHeader
          title="Browse by Style"
          subtitle="Filter by the aesthetic that inspires you"
          href="/search"
        />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {styleCategories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} type="style" />
          ))}
        </div>
      </section>

      {/* ─── Featured builds ──────────────────────────────── */}
      <section>
        <SectionHeader
          title="Featured Builds"
          subtitle="Hand-picked tutorials to get you started"
          href="/search"
        />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Local sub-component ─────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-bold text-rose-950">{title}</h2>
        <p className="mt-1 text-sm text-rose-700/60">{subtitle}</p>
      </div>
      <Link
        href={href}
        className="text-sm font-medium text-blossom-600 transition hover:text-blossom-500"
      >
        View all →
      </Link>
    </div>
  );
}

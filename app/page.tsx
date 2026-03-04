import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="relative -mx-4 -mt-8 overflow-hidden sm:-mx-6 lg:-mx-8">
        {/* Banner image */}
        <Image
          src="/hero.png"
          alt="Build Schematics — cherry blossom Minecraft world"
          width={1920}
          height={800}
          priority
          className="h-[420px] w-full object-cover sm:h-[520px] lg:h-[620px]"
        />

        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Centred text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blossom-300 bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm text-white">
            <span aria-hidden="true">🌸</span>
            Minecraft Build Tutorials
          </div>

          <h1 className="mb-6 text-4xl font-bold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Build anything in{" "}
            <span className="text-blossom-300">Minecraft</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-white/80 drop-shadow">
            Step-by-step tutorials for every build style — from cozy cottages
            to towering gothic castles. Filter by structure, style, difficulty,
            and more.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/search"
              className="rounded-lg bg-blossom-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-blossom-500"
            >
              Browse All Builds
            </Link>
            <Link
              href="/search?difficulty=Beginner"
              className="rounded-lg border border-white/40 bg-white/20 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/30"
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

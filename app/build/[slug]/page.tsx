import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Gallery from "@/components/ui/Gallery";
import Badge from "@/components/ui/Badge";
import Tag from "@/components/ui/Tag";
import BuildCard from "@/components/build/BuildCard";
import { builds } from "@/lib/data";
import { getBuildBySlug, getRelatedBuilds, structureToSlug } from "@/lib/utils";

// ─── Static params ─────────────────────────────────────────────

export function generateStaticParams() {
  return builds.map((b) => ({ slug: b.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const build = getBuildBySlug(params.slug);
  if (!build) return {};

  return {
    title: build.title,
    description: build.description,
    openGraph: {
      title: `${build.title} | BlockBlueprints`,
      description: build.description,
      images: build.images[0] ? [{ url: build.images[0] }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: build.title,
      description: build.description,
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────

/**
 * Build detail page — server component.
 * Displays gallery, metadata, step-by-step tutorial, and related builds.
 */
export default function BuildDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const buildOrUndefined = getBuildBySlug(params.slug);
  if (!buildOrUndefined) notFound();
  // notFound() throws, so the assertion below is safe
  const build = buildOrUndefined!;

  const related = getRelatedBuilds(build);

  return (
    <div className="space-y-12">
      {/* ─── Breadcrumb ────────────────────────────────────── */}
      <nav className="flex items-center gap-1.5 text-sm text-rose-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blossom-600 transition">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/builds/${structureToSlug(build.structure)}`}
          className="hover:text-blossom-600 transition capitalize"
        >
          {build.structure}
        </Link>
        <span>/</span>
        <span className="text-rose-800">{build.title}</span>
      </nav>

      {/* ─── Main grid ─────────────────────────────────────── */}
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Left: gallery + tutorial */}
        <div className="space-y-10">
          {/* Gallery */}
          <Gallery images={build.images} alt={build.title} />

          {/* Tutorial steps */}
          <section>
            <h2 className="mb-6 text-xl font-bold text-blossom-600">
              Step-by-Step Tutorial
            </h2>
            <ol className="space-y-8">
              {build.steps.map((step) => (
                <li key={step.stepNumber} className="flex gap-4">
                  {/* Step number pill */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blossom-700 text-sm font-bold text-white">
                    {step.stepNumber}
                  </div>

                  <div className="flex-1 space-y-3">
                    <h3 className="font-semibold text-blossom-700">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-rose-700/70">
                      {step.description}
                    </p>
                    {step.image && (
                      <div className="relative aspect-video overflow-hidden rounded-lg border border-blossom-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={step.image}
                          alt={`Step ${step.stepNumber}: ${step.title}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Right: metadata sidebar */}
        <aside className="space-y-6">
          {/* Title + badges */}
          <div>
            <h1 className="text-2xl font-bold text-blossom-600 lg:text-3xl">
              {build.title}
            </h1>
            <p className="mt-2 text-rose-700/70">{build.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge difficulty={build.difficulty} />
              {build.survivalFriendly && (
                <span className="inline-flex items-center rounded-full bg-blossom-100 px-2.5 py-0.5 text-xs font-semibold text-blossom-700 ring-1 ring-blossom-300">
                  ⛏ Survival Friendly
                </span>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="rounded-xl border border-blossom-200 bg-white p-4 space-y-3">
            <StatRow label="Structure">
              <Link
                href={`/builds/${structureToSlug(build.structure)}`}
                className="text-blossom-400 hover:underline"
              >
                {build.structure}
              </Link>
            </StatRow>
            <StatRow label="Estimated Time">{build.estimatedTime}</StatRow>
            <StatRow label="Difficulty">{build.difficulty}</StatRow>
            <StatRow label="Survival Mode">
              {build.survivalFriendly ? "✅ Yes" : "❌ No"}
            </StatRow>
          </div>

          {/* Style tags */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
              Styles
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {build.styles.map((s) => (
                <Link key={s} href={`/styles/${s.toLowerCase()}`}>
                  <Tag label={s} />
                </Link>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
              Materials
            </h3>
            <ul className="space-y-1">
              {build.materials.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-2 text-sm text-rose-800"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blossom-500" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* ─── Related builds ────────────────────────────────── */}
      {related.length > 0 && (
        <section>
          <h2 className="mb-6 text-xl font-bold text-blossom-600">Related Builds</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b) => (
              <BuildCard key={b.id} build={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ─── Sub-component ─────────────────────────────────────────────

function StatRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-rose-500">{label}</span>
      <span className="font-medium text-blossom-700">{children}</span>
    </div>
  );
}

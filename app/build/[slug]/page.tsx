import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Gallery from "@/components/ui/Gallery";
import Badge from "@/components/ui/Badge";
import Tag from "@/components/ui/Tag";
import BuildCard from "@/components/build/BuildCard";
import DeleteBuildButton from "@/components/build/DeleteBuildButton";
import { builds } from "@/lib/data";
import { getBuildBySlugAsync, getRelatedBuilds, structureToSlug } from "@/lib/utils";
import { auth } from "@/auth";

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
  const build = await getBuildBySlugAsync(params.slug);
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
export default async function BuildDetailPage({
  params,
}: {
  params: { slug: string };
}) {

  const buildOrUndefined = await getBuildBySlugAsync(params.slug);
  if (!buildOrUndefined) notFound();
  const build = buildOrUndefined!;

  const session = await auth();
  const isOwner = !!session?.user?.id && session.user.id === build.submittedBy;


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

      {/* ─── Resource pack notice ──────────────────────────── */}
      {build.requiresResourcePack && (
        <div className="flex gap-3 rounded-xl border border-blossom-300 bg-blossom-50 p-4">
          <span className="text-2xl" aria-hidden="true">🎨</span>
          <div>
            <p className="font-semibold text-blossom-700">Resource Pack Required</p>
            <p className="mt-0.5 text-sm text-rose-700/80">
              This build uses a custom resource pack to achieve the look shown in the tutorial.
              You will need to download and install the resource pack before starting —
              without it, some blocks and textures will appear differently in-game.
            </p>
          </div>
        </div>
      )}

      {/* ─── Main grid ─────────────────────────────────────── */}
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Left: gallery + tutorial */}
        <div className="space-y-10">
          {/* Gallery */}
          <Gallery images={build.images} alt={build.title} />

          {/* Video tutorial */}
          {build.videoUrl && (
            <section>
              <h2 className="mb-4 text-xl font-bold text-blossom-600">
                Video Tutorial
              </h2>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-blossom-200 shadow-sm">
                <iframe
                  src={`https://www.youtube.com/embed/${build.videoUrl}`}
                  title={`${build.title} — Video Tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </section>
          )}
        </div>

        {/* Right: metadata sidebar */}
        <aside className="space-y-6">
          {/* Title + badges */}
          <div>
            <h1 className="text-2xl font-bold text-blossom-600 lg:text-3xl">
              {build.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge difficulty={build.difficulty} />
              {build.survivalFriendly && (
                <span className="inline-flex items-center rounded-full bg-blossom-100 px-2.5 py-0.5 text-xs font-semibold text-blossom-700 ring-1 ring-blossom-300">
                  ⛏ Survival Friendly
                </span>
              )}
            </div>
          </div>

          {/* Delete button — only shown to the build's creator */}
          {isOwner && (
            <DeleteBuildButton slug={build.slug} />
          )}

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
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {build.materials.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-2 text-sm text-rose-800"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blossom-500" />
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

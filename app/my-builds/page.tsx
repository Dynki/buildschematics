import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import BuildCard from "@/components/build/BuildCard";
import DeleteBuildButton from "@/components/build/DeleteBuildButton";
import type { Build } from "@/lib/types";

export const metadata: Metadata = {
  title: "My Builds",
  description: "Manage the builds you have submitted to BuildSchematics.",
};

// Always fetch fresh — personal page, must not be statically cached
export const dynamic = "force-dynamic";

export default async function MyBuildsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  let builds: Build[] = [];
  let fetchError = false;

  try {
    const client = await clientPromise;
    const db = client.db("buildschematics");

    const docs = await db
      .collection("builds")
      .find({ submittedBy: session.user.id })
      .sort({ submittedAt: -1 })
      .toArray();

    builds = docs.map((doc) => ({
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      structure: doc.structure,
      styles: doc.styles ?? [],
      difficulty: doc.difficulty,
      survivalFriendly: Boolean(doc.survivalFriendly),
      estimatedTime: doc.estimatedTime ?? "",
      materials: doc.materials ?? [],
      images: doc.images ?? [],
      description: doc.description ?? "",
      steps: doc.steps ?? [],
      videoUrl: doc.videoUrl ?? undefined,
      requiresResourcePack: Boolean(doc.requiresResourcePack),
      submittedBy: doc.submittedBy,
    }));
  } catch {
    fetchError = true;
  }

  return (
    <div className="space-y-10">
      {/* ─── Header ─────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blossom-600">My Builds</h1>
          <p className="mt-1 text-sm text-rose-500">
            Builds submitted by{" "}
            <span className="font-semibold text-rose-800">{session.user.name}</span>
          </p>
        </div>
        <Link
          href="/submit"
          className="rounded-lg bg-blossom-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blossom-500"
        >
          + Submit New Build
        </Link>
      </div>

      {/* ─── Error state ─────────────────────────────────── */}
      {fetchError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Something went wrong loading your builds. Please try refreshing the page.
        </div>
      )}

      {/* ─── Empty state ─────────────────────────────────── */}
      {!fetchError && builds.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-blossom-200 bg-cream-50 py-20 text-center">
          <span className="text-5xl" aria-hidden="true">🏗️</span>
          <div>
            <p className="text-lg font-semibold text-rose-800">No builds yet</p>
            <p className="mt-1 text-sm text-rose-500">
              Share your first Minecraft build with the community!
            </p>
          </div>
          <Link
            href="/submit"
            className="mt-2 rounded-lg bg-blossom-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blossom-500"
          >
            Submit a Build
          </Link>
        </div>
      )}

      {/* ─── Builds grid ─────────────────────────────────── */}
      {builds.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {builds.map((build) => (
            <div key={build.id} className="flex flex-col gap-2">
              <BuildCard build={build} />
              <div className="flex gap-2">
                <Link
                  href={`/edit/${build.slug}`}
                  className="flex-1 rounded-lg border border-blossom-300 bg-white px-3 py-1.5 text-center text-sm font-semibold text-blossom-600 transition hover:bg-blossom-50"
                >
                  ✏️ Edit
                </Link>
                <div className="flex-1">
                  <DeleteBuildButton slug={build.slug} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { STORAGE_KEY } from "../SubmitForm";

type Draft = {
  title: string;
  structure: string;
  difficulty: string;
  estimatedTime: string;
  survivalFriendly: boolean;
  requiresResourcePack: boolean;
  videoUrl: string;
  materials: string;
  description: string;
  images: string[];
};

export default function PreviewPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) {
      router.replace("/submit");
      return;
    }
    try { setDraft(JSON.parse(saved)); } catch { router.replace("/submit"); }
  }, [router]);

  async function handleSubmit() {
    if (!draft) return;
    setSubmitting(true);
    setError("");

    const materials = draft.materials
      .split("\n")
      .map((m) => m.trim())
      .filter(Boolean);

    const res = await fetch("/api/builds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...draft, materials }),
    });

    setSubmitting(false);

    if (res.ok) {
      sessionStorage.removeItem(STORAGE_KEY);
      router.push("/submit/success");
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong. Please try again.");
    }
  }

  if (!draft) {
    return <div className="h-64 animate-pulse rounded-xl bg-cream-200" />;
  }

  const materials = draft.materials.split("\n").map((m) => m.trim()).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blossom-600">Preview Your Build</h1>
          <p className="mt-1 text-sm text-rose-700/70">
            This is how your build will appear. Happy with it? Hit submit!
          </p>
        </div>
        <Link
          href="/submit"
          className="rounded-lg border border-blossom-300 px-4 py-2 text-sm font-semibold text-rose-800 transition hover:border-blossom-500 hover:text-blossom-600"
        >
          ← Back to Edit
        </Link>
      </div>

      {/* Resource pack notice */}
      {draft.requiresResourcePack && (
        <div className="flex gap-3 rounded-xl border border-blossom-300 bg-blossom-50 p-4">
          <span className="text-2xl" aria-hidden="true">🎨</span>
          <div>
            <p className="font-semibold text-blossom-700">Resource Pack Required</p>
            <p className="mt-0.5 text-sm text-rose-700/80">
              This build requires a custom resource pack to look as shown.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Left */}
        <div className="space-y-8">
        {/* Images */}
          {draft.images?.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-bold text-blossom-600">Images</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {draft.images.map((src, i) => (
                  <div key={i} className="relative aspect-video overflow-hidden rounded-lg border border-blossom-200">
                    <Image src={src} alt={`Build image ${i + 1}`} fill className="object-cover" />
                    {i === 0 && (
                      <span className="absolute left-2 top-2 rounded-full bg-blossom-600 px-2 py-0.5 text-xs font-semibold text-white">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Video embed */}
          {draft.videoUrl && (
            <section>
              <h2 className="mb-4 text-xl font-bold text-blossom-600">Video Tutorial</h2>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-blossom-200 shadow-sm">
                <iframe
                  src={`https://www.youtube.com/embed/${draft.videoUrl}`}
                  title="Video Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </section>
          )}

          {/* Description */}
          {draft.description && (
            <section>
              <h2 className="mb-2 text-xl font-bold text-blossom-600">Description</h2>
              <p className="text-rose-700/80 leading-relaxed">{draft.description}</p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Title + badges */}
          <div>
            <h1 className="text-2xl font-bold text-blossom-600">{draft.title}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${difficultyColor(draft.difficulty)}`}>
                {draft.difficulty}
              </span>
              {draft.survivalFriendly && (
                <span className="inline-flex items-center rounded-full bg-blossom-100 px-2.5 py-0.5 text-xs font-semibold text-blossom-700 ring-1 ring-blossom-300">
                  ⛏ Survival Friendly
                </span>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="rounded-xl border border-blossom-200 bg-white p-4 space-y-3">
            <StatRow label="Structure">{draft.structure}</StatRow>
            <StatRow label="Estimated Time">{draft.estimatedTime || "—"}</StatRow>
            <StatRow label="Difficulty">{draft.difficulty}</StatRow>
            <StatRow label="Survival Mode">{draft.survivalFriendly ? "✅ Yes" : "❌ No"}</StatRow>
          </div>

          {/* Materials */}
          {materials.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
                Materials
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {materials.map((m) => (
                  <li key={m} className="flex items-center gap-2 text-sm text-rose-800">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blossom-500" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Submit bar */}
      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-xl border border-blossom-200 bg-white px-5 py-4 shadow-lg shadow-blossom-100">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <p className="text-sm text-rose-700/70 hidden sm:block">Everything look good?</p>
        <div className="flex gap-3 ml-auto">
          <Link
            href="/submit"
            className="rounded-lg border border-blossom-300 px-4 py-2.5 text-sm font-semibold text-rose-800 transition hover:border-blossom-500 hover:text-blossom-600"
          >
            ← Edit
          </Link>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-lg bg-blossom-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blossom-500 disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Confirm & Submit 🌸"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-rose-500">{label}</span>
      <span className="font-medium text-blossom-700">{children}</span>
    </div>
  );
}

function difficultyColor(d: string) {
  if (d === "Beginner") return "bg-blossom-600";
  if (d === "Intermediate") return "bg-purple-500";
  return "bg-red-600";
}

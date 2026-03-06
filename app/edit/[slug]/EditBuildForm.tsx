"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Build } from "@/lib/types";

export default function EditBuildForm({ build }: { build: Build }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: build.title,
    structure: build.structure,
    difficulty: build.difficulty,
    estimatedTime: build.estimatedTime ?? "",
    survivalFriendly: build.survivalFriendly,
    requiresResourcePack: build.requiresResourcePack ?? false,
    videoUrl: build.videoUrl ?? "",
    materials: build.materials.join("\n"),
    description: build.description,
  });

  // Existing Cloudinary URLs already saved to the build
  const [existingImages, setExistingImages] = useState<string[]>(build.images);
  // New local files the user has picked but not yet uploaded
  const [newPreviews, setNewPreviews] = useState<{ file: File; url: string }[]>([]);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function removeExistingImage(index: number) {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  }

  function removeNewImage(index: number) {
    setNewPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const previews = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    setNewPreviews((prev) => [...prev, ...previews]);
    // Reset input so the same file can be re-selected if needed
    e.target.value = "";
  }

  const totalImages = existingImages.length + newPreviews.length;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    let allImageUrls = [...existingImages];

    // Upload any newly added images first
    if (newPreviews.length > 0) {
      setUploading(true);
      const fd = new FormData();
      newPreviews.forEach(({ file }) => fd.append("images", file));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      setUploading(false);

      if (!res.ok) {
        setError("Image upload failed. Please try again.");
        return;
      }
      const { urls } = await res.json();
      allImageUrls = [...allImageUrls, ...urls];
    }

    setSaving(true);
    const materials = form.materials
      .split("\n")
      .map((m) => m.trim())
      .filter(Boolean);

    const res = await fetch(`/api/builds?slug=${encodeURIComponent(build.slug)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, materials, images: allImageUrls }),
    });

    setSaving(false);

    if (res.ok) {
      const { slug: newSlug } = await res.json();
      router.push(`/build/${newSlug}`);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong. Please try again.");
    }
  }

  const busy = uploading || saving;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-blossom-600">Edit Build</h1>
        <p className="mt-2 text-rose-700/70">
          Update your build details below and save when you&apos;re done.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 rounded-xl border border-blossom-200 bg-white p-6">
        <Field label="Build Title" htmlFor="title">
          <input
            id="title" name="title" type="text" required
            value={form.title} onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field label="Structure Type" htmlFor="structure">
          <select id="structure" name="structure" required value={form.structure} onChange={handleChange} className={inputClass}>
            <option value="">Select a structure…</option>
            <option>Castles</option>
            <option>Houses</option>
            <option>Villages</option>
            <option>Mega Builds</option>
            <option>Farms</option>
          </select>
        </Field>

        <Field label="Difficulty" htmlFor="difficulty">
          <select id="difficulty" name="difficulty" required value={form.difficulty} onChange={handleChange} className={inputClass}>
            <option value="">Select difficulty…</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </Field>

        <Field label="Estimated Time" htmlFor="estimatedTime">
          <input
            id="estimatedTime" name="estimatedTime" type="text"
            placeholder="e.g. 3–5 hours"
            value={form.estimatedTime} onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <div className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox" name="survivalFriendly"
              checked={form.survivalFriendly} onChange={handleChange}
              className="h-4 w-4 rounded border-blossom-300 text-blossom-600 focus:ring-blossom-400"
            />
            <span className="text-sm font-medium text-rose-800">Survival Friendly</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox" name="requiresResourcePack"
              checked={form.requiresResourcePack} onChange={handleChange}
              className="h-4 w-4 rounded border-blossom-300 text-blossom-600 focus:ring-blossom-400"
            />
            <span className="text-sm font-medium text-rose-800">Requires a Resource Pack</span>
          </label>
        </div>

        <Field label="YouTube Video ID (optional)" htmlFor="videoUrl">
          <input
            id="videoUrl" name="videoUrl" type="text"
            placeholder="e.g. AQlbt5nGn38"
            value={form.videoUrl} onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field
          label="Build Images" htmlFor="images"
          hint="The first image is used as the cover. Remove or add images below."
        >
          {/* Existing saved images */}
          {existingImages.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-2">
              {existingImages.map((url, i) => (
                <div key={url} className="relative aspect-video overflow-hidden rounded-lg border border-blossom-200">
                  <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Newly added local previews */}
          {newPreviews.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-2">
              {newPreviews.map((p, i) => (
                <div key={p.url} className="relative aspect-video overflow-hidden rounded-lg border border-dashed border-blossom-300">
                  <Image src={p.url} alt={`New image ${i + 1}`} fill className="object-cover opacity-80" />
                  <div className="absolute left-1 top-1 rounded bg-blossom-600/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    New
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload more */}
          {totalImages < 5 && (
            <>
              <input
                ref={fileInputRef}
                id="images"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageSelect}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-blossom-300 py-4 text-sm text-rose-700 transition hover:border-blossom-500 hover:text-blossom-600"
              >
                <span className="text-lg">📷</span>
                {totalImages === 0 ? "Click to add images" : "Add more images"}
              </button>
            </>
          )}
        </Field>

        <Field
          label="Materials List" htmlFor="materials"
          hint="One material per line, e.g. Moss Block (12 stacks)"
        >
          <textarea
            id="materials" name="materials" rows={6}
            placeholder={"Moss Block (12 stacks)\nSpruce Stairs (8 stacks)"}
            value={form.materials} onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field label="Short Description" htmlFor="description">
          <textarea
            id="description" name="description" rows={3}
            value={form.description} onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={busy}
            className="rounded-lg border border-blossom-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-cream-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="flex-1 rounded-lg bg-blossom-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blossom-500 disabled:opacity-50"
          >
            {uploading ? "Uploading images…" : saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────

const inputClass =
  "w-full rounded-lg border border-blossom-200 bg-cream-50 px-3 py-2 text-sm text-rose-950 placeholder-rose-300 focus:border-blossom-400 focus:outline-none focus:ring-2 focus:ring-blossom-400/30";

function Field({ label, htmlFor, hint, children }: {
  label: string; htmlFor: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-rose-800">{label}</label>
      {hint && <p className="text-xs text-rose-400">{hint}</p>}
      {children}
    </div>
  );
}

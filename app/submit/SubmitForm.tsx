"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const STORAGE_KEY = "build_draft";

export default function SubmitForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    structure: "",
    difficulty: "",
    estimatedTime: "",
    survivalFriendly: false,
    requiresResourcePack: false,
    videoUrl: "",
    materials: "",
    description: "",
  });

  const [imagePreviews, setImagePreviews] = useState<{ file: File; url: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  // Restore draft if the user came back from preview to edit
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm(parsed);
        if (parsed.images) setUploadedUrls(parsed.images);
      } catch {}
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImagePreviews((prev) => [...prev, ...previews]);
  }

  function removeImage(index: number) {
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
    setUploadedUrls((prev) => prev.filter((_, i) => i !== index));
  }

  async function handlePreview(e: React.FormEvent) {
    e.preventDefault();

    let imageUrls = uploadedUrls;

    // Upload any newly selected images that haven't been uploaded yet
    const unuploaded = imagePreviews.slice(uploadedUrls.length);
    if (unuploaded.length > 0) {
      setUploading(true);
      const fd = new FormData();
      unuploaded.forEach(({ file }) => fd.append("images", file));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      setUploading(false);
      if (res.ok) {
        const { urls } = await res.json();
        imageUrls = [...uploadedUrls, ...urls];
        setUploadedUrls(imageUrls);
      }
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...form, images: imageUrls }));
    router.push("/submit/preview");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-blossom-600">Submit a Build</h1>
        <p className="mt-2 text-rose-700/70">
          Fill in your build details, then preview it before submitting.
        </p>
      </div>

      <form onSubmit={handlePreview} className="space-y-6 rounded-xl border border-blossom-200 bg-white p-6">
        <Field label="Build Title" htmlFor="title">
          <input
            id="title" name="title" type="text" required
            placeholder="e.g. Moss Fairy Cottage"
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
          hint="Upload up to 5 screenshots. The first image will be used as the cover."
        >
          {/* Previews */}
          {imagePreviews.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-2">
              {imagePreviews.map((p, i) => (
                <div key={i} className="relative aspect-video overflow-hidden rounded-lg border border-blossom-200">
                  <Image src={p.url} alt={`Image ${i + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload button */}
          {imagePreviews.length < 5 && (
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
                {imagePreviews.length === 0 ? "Click to add images" : "Add more images"}
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
            placeholder="A brief summary shown on build cards…"
            value={form.description} onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <button
          type="submit"
          disabled={uploading}
          className="w-full rounded-lg bg-blossom-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blossom-500 disabled:opacity-50"
        >
          {uploading ? "Uploading images…" : "Preview Build →"}
        </button>
      </form>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────

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

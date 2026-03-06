/**
 * Uploads image files directly from the browser to Cloudinary
 * using a server-issued signature. Images never pass through Vercel.
 */
export async function uploadImages(files: File[]): Promise<string[]> {
  if (!files.length) return [];

  // 1. Get a signed upload credential from our API (tiny request, no images)
  const sigRes = await fetch("/api/upload");
  if (!sigRes.ok) throw new Error("Failed to get upload signature.");
  const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

  // 2. Upload every file directly to Cloudinary in parallel
  const urls = await Promise.all(
    files.map(async (file) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "buildschematics");
      fd.append("timestamp", String(timestamp));
      fd.append("signature", signature);
      fd.append("api_key", apiKey);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: fd }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message ?? "Cloudinary upload failed.");
      }

      const data = await res.json();
      return data.secure_url as string;
    })
  );

  return urls;
}

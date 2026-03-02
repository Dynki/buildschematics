"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  images: string[];
  alt: string;
}

/**
 * Image gallery with a large preview and clickable thumbnails.
 * Client component — manages the active image selection.
 */
export default function Gallery({ images, alt }: GalleryProps) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-blossom-200">
        <Image
          src={images[active]}
          alt={`${alt} — image ${active + 1}`}
          fill
          className="object-cover transition duration-300"
          sizes="(max-width: 768px) 100vw, 70vw"
          priority={active === 0}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === active
                  ? "border-blossom-500"
                  : "border-blossom-200 hover:border-blossom-400"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

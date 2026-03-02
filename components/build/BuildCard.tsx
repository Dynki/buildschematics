import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Tag from "@/components/ui/Tag";
import type { Build } from "@/lib/types";

interface BuildCardProps {
  build: Build;
}

/**
 * Card displayed in build grids. Server component.
 * Links to the detail page at /build/[slug].
 */
export default function BuildCard({ build }: BuildCardProps) {
  return (
    <Link
      href={`/build/${build.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-blossom-200 bg-white transition hover:border-blossom-400 hover:shadow-lg hover:shadow-blossom-100"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-cream-200">
        <Image
          src={build.images[0]}
          alt={build.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {/* Difficulty badge overlaid on image */}
        <div className="absolute left-2 top-2">
          <Badge difficulty={build.difficulty} />
        </div>
        {/* Survival badge */}
        {build.survivalFriendly && (
          <div className="absolute right-2 top-2 rounded-full bg-blossom-700/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            ⛏ Survival
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-semibold text-rose-950 group-hover:text-blossom-600 transition">
          {build.title}
        </h3>
        <p className="line-clamp-2 text-sm text-rose-700/60">{build.description}</p>

        {/* Meta row — no nested interactive elements inside the card link */}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs text-rose-500">
          <span>🏗 {build.structure}</span>
          <span>⏱ {build.estimatedTime}</span>
        </div>

        {/* Style tags */}
        <div className="flex flex-wrap gap-1">
          {build.styles.map((s) => (
            <Tag key={s} label={s} />
          ))}
        </div>
      </div>
    </Link>
  );
}

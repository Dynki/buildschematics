import Link from "next/link";
import type { CategoryMeta } from "@/lib/types";

interface CategoryCardProps {
  category: CategoryMeta;
  /** "structure" links to /builds/[slug], "style" to /styles/[slug] */
  type: "structure" | "style";
  /** Optional: show build count */
  count?: number;
}

/**
 * Card for structure or style category — server component.
 */
export default function CategoryCard({
  category,
  type,
  count,
}: CategoryCardProps) {
  const href =
    type === "structure"
      ? `/builds/${category.slug}`
      : `/styles/${category.slug}`;

  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between overflow-hidden rounded-xl p-5 ${category.color} border border-transparent transition hover:border-blossom-400 hover:shadow-md hover:shadow-blossom-100`}
    >
      <div>
        <span className="text-3xl" aria-hidden="true">
          {category.emoji}
        </span>
        <h3 className="mt-2 text-base font-semibold text-white group-hover:text-blossom-300 transition">
          {category.label}
        </h3>
        <p className="mt-1 text-sm text-white/60">{category.description}</p>
      </div>

      {count !== undefined && (
        <p className="mt-3 text-xs font-medium text-white/40">
          {count} build{count !== 1 ? "s" : ""}
        </p>
      )}
    </Link>
  );
}

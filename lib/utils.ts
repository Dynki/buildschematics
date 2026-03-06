import type { Build, BuildFilters, StructureCategory, AestheticStyle } from "./types";
import { builds as staticBuilds } from "./data";
import clientPromise from "./mongodb";

// ─────────────────────────────────────────────────────────────
// MongoDB helpers
// ─────────────────────────────────────────────────────────────

/** Fetch all approved builds from MongoDB and normalise them to the Build shape. */
async function getDbBuilds(): Promise<Build[]> {
  try {
    const client = await clientPromise;
    const db = client.db("buildschematics");
    const docs = await db.collection("builds").find({ approved: true }).toArray();
    return docs.map((doc) => ({
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
      submittedBy: doc.submittedBy?.toString() ?? undefined,
    }));
  } catch {
    return [];
  }
}

/** Merge static + DB builds (DB builds are appended after static ones). */
export async function getAllBuilds(): Promise<Build[]> {
  const dbBuilds = await getDbBuilds();
  return [...dbBuilds];
}

// ─────────────────────────────────────────────────────────────
// Slug helpers
// ─────────────────────────────────────────────────────────────

/** Convert a StructureCategory label to its URL slug (lowercase, hyphens). */
export function structureToSlug(structure: StructureCategory): string {
  return structure.toLowerCase().replace(/\s+/g, "-");
}

/** Convert a URL slug back to a StructureCategory label. */
export function slugToStructure(slug: string): StructureCategory | undefined {
  const label = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ") as StructureCategory;

  const valid: StructureCategory[] = [
    "Castles",
    "Houses",
    "Villages",
    "Mega Builds",
    "Farms",
  ];
  return valid.includes(label) ? label : undefined;
}

/** Convert an AestheticStyle label to its URL slug. */
export function styleToSlug(style: AestheticStyle): string {
  return style.toLowerCase();
}

/** Convert a URL slug back to an AestheticStyle. */
export function slugToStyle(slug: string): AestheticStyle | undefined {
  const label =
    (slug.charAt(0).toUpperCase() + slug.slice(1)) as AestheticStyle;
  const valid: AestheticStyle[] = [
    "Gothic",
    "Medieval",
    "Modern",
    "Cottagecore",
    "Fantasy",
    "Desert",
    "Snow",
  ];
  return valid.includes(label) ? label : undefined;
}

// ─────────────────────────────────────────────────────────────
// Filtering
// ─────────────────────────────────────────────────────────────

/**
 * Filter a builds array using the provided criteria.
 * All filters are AND-combined. Missing filters are ignored.
 */
export function filterBuilds(filters: BuildFilters, source: Build[] = staticBuilds): Build[] {
  return source.filter((build) => {
    // Text search across title, description, materials, styles, structure
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const searchTarget = [
        build.title,
        build.description,
        build.structure,
        ...build.styles,
        ...build.materials,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchTarget.includes(q)) return false;
    }

    // Structure filter
    if (filters.structure && build.structure !== filters.structure) {
      return false;
    }

    // Style filter
    if (filters.style && !build.styles.includes(filters.style)) {
      return false;
    }

    // Difficulty filter
    if (filters.difficulty && build.difficulty !== filters.difficulty) {
      return false;
    }

    // Survival friendly filter
    if (
      filters.survivalFriendly !== undefined &&
      build.survivalFriendly !== filters.survivalFriendly
    ) {
      return false;
    }

    return true;
  });
}

// ─────────────────────────────────────────────────────────────
// Lookup helpers
// ─────────────────────────────────────────────────────────────

/** Get a single build by its slug — checks static builds only (sync). For DB builds use getDbBuildBySlug. */
export function getBuildBySlug(slug: string): Build | undefined {
  return staticBuilds.find((b) => b.slug === slug);
}

/** Get a single build by slug from both static and DB sources. */
export async function getBuildBySlugAsync(slug: string): Promise<Build | undefined> {
  const all = await getAllBuilds();
  return all.find((b) => b.slug === slug);
}

/** Get related builds — same structure OR overlapping styles, excluding self. */
export function getRelatedBuilds(build: Build, limit = 3): Build[] {
  return staticBuilds
    .filter(
      (b) =>
        b.id !== build.id &&
        (b.structure === build.structure ||
          b.styles.some((s) => build.styles.includes(s)))
    )
    .slice(0, limit);
}

/** Get featured builds (first N from the full list). */
export function getFeaturedBuilds(limit = 4): Build[] {
  return staticBuilds.slice(0, limit);
}

// ─────────────────────────────────────────────────────────────
// Display helpers
// ─────────────────────────────────────────────────────────────

/** Map difficulty to a Tailwind colour class for the badge. */
export function difficultyColor(
  difficulty: Build["difficulty"]
): string {
  switch (difficulty) {
    case "Beginner":
      return "bg-blossom-600 text-white";
    case "Intermediate":
      return "bg-sakura-500 text-white";
    case "Advanced":
      return "bg-red-600 text-white";
  }
}

/** Capitalise the first letter of a string. */
export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─────────────────────────────────────────────────────────────
// Domain types for BlockBlueprints
// ─────────────────────────────────────────────────────────────

export type StructureCategory =
  | "Castles"
  | "Houses"
  | "Villages"
  | "Mega Builds"
  | "Farms";

export type AestheticStyle =
  | "Gothic"
  | "Medieval"
  | "Modern"
  | "Cottagecore"
  | "Fantasy"
  | "Desert"
  | "Snow";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface BuildStep {
  stepNumber: number;
  title: string;
  description: string;
  image?: string;
}

export interface Build {
  id: string;
  title: string;
  slug: string;
  structure: StructureCategory;
  styles: AestheticStyle[];
  difficulty: Difficulty;
  survivalFriendly: boolean;
  estimatedTime: string;
  materials: string[];
  images: string[];
  /** Short description shown on cards */
  description: string;
  steps: BuildStep[];
}

// ─────────────────────────────────────────────────────────────
// Filter param shapes (used in URL search params)
// ─────────────────────────────────────────────────────────────

export interface BuildFilters {
  style?: AestheticStyle;
  difficulty?: Difficulty;
  survivalFriendly?: boolean;
  structure?: StructureCategory;
  q?: string;
}

// ─────────────────────────────────────────────────────────────
// Category metadata (used for landing grids)
// ─────────────────────────────────────────────────────────────

export interface CategoryMeta {
  label: string;
  slug: string;
  description: string;
  emoji: string;
  color: string; // Tailwind bg class
}

import { difficultyColor } from "@/lib/utils";
import type { Build } from "@/lib/types";

interface BadgeProps {
  /** The difficulty label */
  difficulty: Build["difficulty"];
  className?: string;
}

/**
 * Difficulty badge — colours automatically based on level.
 * Server component — no interactivity needed.
 */
export default function Badge({ difficulty, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${difficultyColor(difficulty)} ${className}`}
    >
      {difficulty}
    </span>
  );
}

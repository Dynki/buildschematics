interface TagProps {
  label: string;
  className?: string;
}

/**
 * Small pill tag — used for styles, materials, etc.
 */
export default function Tag({ label, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block rounded-full border border-blossom-300 bg-blossom-50 px-2.5 py-0.5 text-xs font-medium text-blossom-700 ${className}`}
    >
      {label}
    </span>
  );
}

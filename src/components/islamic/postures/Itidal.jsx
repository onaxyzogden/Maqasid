// I'tidal — upright standing after ruku, arms at sides.
export default function Itidal({ size = 120, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 96"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Itidal — standing upright"
    >
      <circle cx="32" cy="14" r="6" />
      <path d="M32 20 L32 58" />
      {/* arms at sides */}
      <path d="M32 28 L24 54" />
      <path d="M32 28 L40 54" />
      <path d="M32 58 L28 86" />
      <path d="M32 58 L36 86" />
      <path d="M24 86 L32 86" />
      <path d="M32 86 L40 86" />
    </svg>
  );
}

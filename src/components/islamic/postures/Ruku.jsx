// Ruku — bowed 90°, hands gripping the knees, back flat.
export default function Ruku({ size = 120, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 72"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Ruku — bowing"
    >
      {/* head (forward) */}
      <circle cx="20" cy="24" r="6" />
      {/* flat back */}
      <path d="M26 26 L60 26" />
      {/* arms straight down to knees */}
      <path d="M36 26 L36 48" />
      {/* hands on knees */}
      <path d="M32 48 L40 48" />
      {/* hips / upper leg */}
      <path d="M60 26 L60 40" />
      {/* legs straight down */}
      <path d="M58 40 L56 66" />
      <path d="M62 40 L64 66" />
      {/* feet */}
      <path d="M52 66 L60 66" />
      <path d="M60 66 L68 66" />
    </svg>
  );
}

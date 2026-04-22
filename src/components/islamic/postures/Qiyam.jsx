// Qiyam — standing upright, hands folded over the chest.
export default function Qiyam({ size = 120, color = "currentColor" }) {
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
      aria-label="Qiyam — standing"
    >
      {/* head */}
      <circle cx="32" cy="14" r="6" />
      {/* torso */}
      <path d="M32 20 L32 58" />
      {/* folded arms on chest (right over left) */}
      <path d="M32 30 L24 40 L30 44" />
      <path d="M32 30 L40 40 L34 44" />
      {/* legs */}
      <path d="M32 58 L28 86" />
      <path d="M32 58 L36 86" />
      {/* feet */}
      <path d="M24 86 L32 86" />
      <path d="M32 86 L40 86" />
    </svg>
  );
}

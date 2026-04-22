// Salām — closing, seated with head turned to the right (then left).
export default function Salam({ size = 120, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 80"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Salam — closing"
    >
      {/* head turned right (indicated by arc/arrow) */}
      <circle cx="42" cy="14" r="6" />
      {/* subtle arrow indicating head turn */}
      <path d="M50 14 L56 14" opacity="0.45" />
      <path d="M53 11 L56 14 L53 17" opacity="0.45" />
      {/* torso */}
      <path d="M36 20 L36 46" />
      <path d="M36 30 L26 46" />
      <path d="M36 30 L46 46" />
      <path d="M20 48 L52 48" />
      <path d="M20 48 L24 66" />
      <path d="M52 48 L48 66" />
      <path d="M12 68 L60 68" opacity="0.35" strokeDasharray="2 3" />
    </svg>
  );
}

// Jalsah — sitting on the heels between the two prostrations.
export default function Jalsah({ size = 120, color = "currentColor" }) {
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
      aria-label="Jalsah — sitting"
    >
      <circle cx="36" cy="14" r="6" />
      {/* upright torso */}
      <path d="M36 20 L36 46" />
      {/* hands resting on thighs */}
      <path d="M36 30 L26 46" />
      <path d="M36 30 L46 46" />
      {/* thighs horizontal */}
      <path d="M20 48 L52 48" />
      {/* lower legs folded under */}
      <path d="M20 48 L24 66" />
      <path d="M52 48 L48 66" />
      {/* ground */}
      <path d="M12 68 L60 68" opacity="0.35" strokeDasharray="2 3" />
    </svg>
  );
}

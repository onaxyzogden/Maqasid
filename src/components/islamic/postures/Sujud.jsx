// Sujud — prostration. Forehead, nose, palms, knees, and toes touching the ground.
export default function Sujud({ size = 120, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 56"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Sujud — prostration"
    >
      {/* head down */}
      <circle cx="18" cy="34" r="5" />
      {/* back sloping up to hips */}
      <path d="M23 32 L52 20" />
      {/* hips to knees */}
      <path d="M52 20 L66 40" />
      {/* knees to feet */}
      <path d="M66 40 L82 46" />
      {/* arms forward from shoulders to hands near head */}
      <path d="M36 26 L26 46" />
      {/* palms on ground */}
      <path d="M22 46 L30 46" />
      {/* ground line cue */}
      <path d="M8 48 L90 48" opacity="0.35" strokeDasharray="2 3" />
    </svg>
  );
}

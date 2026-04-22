// Tashahhud — side view, seated with right index finger raised at the shahādah.
export default function Tashahhud({ size = 120, color = "currentColor" }) {
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
      aria-label="Tashahhud — sitting with index finger raised"
    >
      {/* head in profile, facing right */}
      <circle cx="32" cy="14" r="6" />
      {/* torso */}
      <path d="M32 20 L32 46" />
      {/* visible arm: shoulder → elbow → hand resting on thigh */}
      <path d="M32 26 L40 40 L50 46" />
      {/* raised index finger — extended forward past the knee */}
      <path d="M50 46 L58 42" strokeWidth="2.6" />
      {/* right thigh, horizontal forward */}
      <path d="M32 48 L54 48" />
      {/* right shin folded back under */}
      <path d="M54 48 L40 62" />
      {/* left foot tucked under (iftirash) */}
      <path d="M40 62 L22 62" />
      {/* ground */}
      <path d="M12 68 L60 68" opacity="0.35" strokeDasharray="2 3" />
    </svg>
  );
}

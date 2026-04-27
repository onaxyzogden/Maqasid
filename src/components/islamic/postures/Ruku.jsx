import src from "@/assets/postures/ruku.png";

export default function Ruku({ size = 120 }) {
  return (
    <span
      className="posture-tile"
      style={{ "--posture-size": `${size}px` }}
      aria-label="Ruku — bowing"
    >
      <img src={src} alt="" draggable="false" />
    </span>
  );
}

import src from "@/assets/postures/sujud.png";

export default function Sujud({ size = 120 }) {
  return (
    <span
      className="posture-tile"
      style={{ "--posture-size": `${size}px` }}
      aria-label="Sujud — prostration"
    >
      <img src={src} alt="" draggable="false" />
    </span>
  );
}

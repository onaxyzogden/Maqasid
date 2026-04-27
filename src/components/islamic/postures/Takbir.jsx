import src from "@/assets/postures/takbir.png";

export default function Takbir({ size = 120 }) {
  return (
    <span
      className="posture-tile"
      style={{ "--posture-size": `${size}px` }}
      aria-label="Takbiratul-ihram — opening, hands raised"
    >
      <img src={src} alt="" draggable="false" />
    </span>
  );
}

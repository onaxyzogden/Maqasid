import src from "@/assets/postures/seated.png";

export default function Salam({ size = 120 }) {
  return (
    <span
      className="posture-tile"
      style={{ "--posture-size": `${size}px` }}
      aria-label="Salam — closing"
    >
      <img src={src} alt="" draggable="false" />
    </span>
  );
}

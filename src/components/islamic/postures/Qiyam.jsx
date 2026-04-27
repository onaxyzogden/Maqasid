import src from "@/assets/postures/qiyam.png";

export default function Qiyam({ size = 120 }) {
  return (
    <span
      className="posture-tile"
      style={{ "--posture-size": `${size}px` }}
      aria-label="Qiyam — standing"
    >
      <img src={src} alt="" draggable="false" />
    </span>
  );
}

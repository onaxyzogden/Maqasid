import src from "@/assets/postures/seated.png";

export default function Tashahhud({ size = 120 }) {
  return (
    <span
      className="posture-tile"
      style={{ "--posture-size": `${size}px` }}
      aria-label="Tashahhud — final sitting"
    >
      <img src={src} alt="" draggable="false" />
    </span>
  );
}

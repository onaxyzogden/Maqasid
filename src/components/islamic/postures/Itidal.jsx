import src from "@/assets/postures/itidal.png";

export default function Itidal({ size = 120 }) {
  return (
    <span
      className="posture-tile"
      style={{ "--posture-size": `${size}px` }}
      aria-label="I'tidal — standing upright after ruku"
    >
      <img src={src} alt="" draggable="false" />
    </span>
  );
}

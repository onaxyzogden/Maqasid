import src from "@/assets/postures/seated.png";

export default function Jalsah({ size = 120 }) {
  return (
    <span
      className="posture-tile"
      style={{ "--posture-size": `${size}px` }}
      aria-label="Jalsah — sitting between sujuds"
    >
      <img src={src} alt="" draggable="false" />
    </span>
  );
}

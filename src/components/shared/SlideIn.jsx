import Modal from './Modal';
import './SlideIn.css';

// Right-hand slide-in panel (the `.money-slidein` pattern) as a real dialog —
// shared/Modal dressed as a panel: focus is trapped, Escape and a click on
// the dim backdrop close it, and if anything inside has been typed into,
// those two accidental exits ask "Discard unsaved changes?" first. An
// explicit Cancel / ✕ in the panel calls onClose directly.
//
//   <SlideIn onClose={onClose} label="Bank account">…header/body/footer…</SlideIn>
//
// `dirty` overrides the automatic input tracking when a form knows better.
// Pass `active={false}` while a nested panel (e.g. CategoryPanel) is on top
// so the two don't fight over Escape and Tab.
export default function SlideIn({ className = '', ...props }) {
  return (
    <Modal
      {...props}
      overlayClassName="money-slidein-overlay"
      className={`money-slidein ${className}`.trim()}
    />
  );
}

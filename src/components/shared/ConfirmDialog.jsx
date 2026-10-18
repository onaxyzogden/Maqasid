import { useEffect, useRef } from 'react';
import { useConfirmStore } from '../../store/confirm-store';
import Modal from './Modal';
import './ConfirmDialog.css';

// Renders the head of the confirm queue (store/confirm-store.js). Mounted
// once in AppShell. Focus starts on Cancel so Enter never destroys anything
// by accident; Escape and the backdrop also answer "no".
export default function ConfirmDialog() {
  const current = useConfirmStore((s) => s.queue[0]);
  const answer = useConfirmStore((s) => s.answer);
  if (!current) return null;
  // key: a queued second request gets a fresh dialog (and fresh focus).
  return <ConfirmBox key={current.id} req={current} answer={answer} />;
}

function ConfirmBox({ req, answer }) {
  const cancelRef = useRef(null);
  useEffect(() => { cancelRef.current?.focus(); }, []);
  const {
    id, title, body, confirmLabel = 'Confirm', cancelLabel = 'Cancel', danger = false, extraAction,
  } = req;
  const titleId = `confirm-title-${id}`;
  const bodyId = `confirm-body-${id}`;

  return (
    <Modal
      onClose={() => answer(id, false)}
      labelledBy={titleId}
      dirty={false}
      className="ui-modal confirm-dialog"
    >
      <h2 id={titleId} className="confirm-dialog__title">{title}</h2>
      {body && <p id={bodyId} className="confirm-dialog__body">{body}</p>}
      <div className="confirm-dialog__actions">
        {extraAction && (
          <button type="button" className="btn btn-ghost confirm-dialog__extra" onClick={extraAction.onClick}>
            {extraAction.label}
          </button>
        )}
        <button type="button" ref={cancelRef} className="btn btn-secondary" onClick={() => answer(id, false)}>
          {cancelLabel}
        </button>
        <button
          type="button"
          className={`btn ${danger ? 'confirm-dialog__danger' : 'btn-primary'}`}
          onClick={() => answer(id, true)}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

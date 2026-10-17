import { useState } from 'react';

// A required field that explains itself instead of silently disabling Save.
// The submit button stays enabled; pressing it while the field is empty
// shows the message, marks the field aria-invalid and moves focus to it.
//
//   const req = useRequiredField(!!name.trim(), 'vendor-name');
//   <input id="vendor-name" {...req.fieldProps} … />
//   <FieldError id={req.errorId} show={req.show}>Name is required</FieldError>
//   <button onClick={req.guard(handleSave)}>Save</button>
export function useRequiredField(valid, fieldId) {
  const [tried, setTried] = useState(false);
  const show = tried && !valid;
  const errorId = `${fieldId}-error`;
  return {
    show,
    errorId,
    fieldProps: {
      'aria-required': true,
      'aria-invalid': show || undefined,
      'aria-describedby': show ? errorId : undefined,
    },
    guard: (fn) => (...args) => {
      if (!valid) {
        setTried(true);
        document.getElementById(fieldId)?.focus();
        return;
      }
      setTried(false);
      fn(...args);
    },
  };
}

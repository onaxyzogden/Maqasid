// Inline validation message paired with useRequiredField.
export default function FieldError({ id, show, children }) {
  if (!show) return null;
  return <p id={id} className="field-error" role="alert">{children}</p>;
}

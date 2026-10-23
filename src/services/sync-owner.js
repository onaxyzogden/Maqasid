// Whose account the device is working in, for code that must not import the
// auth store (the stores, the record sync). main.jsx points it at the auth
// store once the record sync starts; until then, and for a guest, it is null.
let source = () => null;

/** The signed-in account's id, or null. */
export const cloudOwner = () => source() ?? null;

export function setOwnerSource(fn) {
  source = fn;
}

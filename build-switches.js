// Build switches, read by vite.config.js and vitest.config.js.
// Each becomes a `define` constant, so code behind a switch that is off is
// removed from the build (an import.meta.env read would not be, and would
// ship supabase-js to every visitor; tasks/lessons.md #16).
// Off unless the build environment sets the variable to exactly 1.
// The deploy workflow sets neither.

export const switchOn = (value) => value === '1';

export function buildSwitches(env) {
  return {
    __CLOUD_ACCOUNTS__: JSON.stringify(switchOn(env.VITE_CLOUD_ACCOUNTS)),
    __OFFLINE_SHELL__: JSON.stringify(switchOn(env.VITE_OFFLINE_SHELL)),
  };
}

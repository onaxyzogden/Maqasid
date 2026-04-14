/** Greeting by time of day */
export function getGreeting() {
  const h = new Date().getHours();
  if (h < 6) return "you're burning the midnight oil";
  if (h < 12) return "you've made it to the morning";
  if (h < 17) return "you've made it to the afternoon";
  if (h < 21) return "you've made it to the evening";
  return "you're closing out the day";
}

export function getMotivation() {
  const phrases = [
    "You've got a mountain to climb today.",
    "Stay focused, stay blessed.",
    "Excellence is a habit, not an act.",
    "Small steps lead to great outcomes.",
    "Every task completed is a step forward.",
  ];
  const dayIndex = new Date().getDate() % phrases.length;
  return phrases[dayIndex];
}

/** BCG chart range options (day-based) */
export const BCG_RANGES = [
  { id: '7d',  label: '7 days',  days: 7 },
  { id: '14d', label: '14 days', days: 14 },
  { id: '30d', label: '30 days', days: 30 },
];

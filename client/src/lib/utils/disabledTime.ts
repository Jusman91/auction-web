export const disabledTime = () => ({
  disabledHours: () => Array.from({ length: 24 }, (_, i) => i), // Disable all hours
  disabledMinutes: () => Array.from({ length: 60 }, (_, i) => i), // Disable all minutes
  disabledSeconds: () => Array.from({ length: 60 }, (_, i) => i) // Disable all seconds
});

export const THEME_VALUES = [
  "system",
  "dark",
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
] as const;

export type ThemeValues = typeof THEME_VALUES;
export type ThemeValue = ThemeValues[number];

export const validateTheme = (input: unknown): input is ThemeValue =>
  typeof input === "string" && THEME_VALUES.includes(input as ThemeValue);

import tinycolor from "tinycolor2";

export function getTopNProsody(scores: Record<string, number>, n = 3) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, value]) => ({ name: key, score: value }))
    .map((entry) => {
      return { ...entry, score: Number(entry.score).toFixed(3) };
    });
}

export const lightenColor = (hex, percentage) => {
  // Ensure the hex code is valid
  const color = tinycolor(hex);
  if (!color) {
    throw new Error("Invalid hex color code");
  }

  // Check if the color is dark
  if (color.isDark()) {
    // Lighten the color if it is dark
    return color.lighten(percentage).toString();
  }

  // Return the original color if it is not dark
  return color.toString();
};

export const darkenColor = (hex, percentage) => {
  // Ensure the hex code is valid
  const color = tinycolor(hex);
  if (!color) {
    throw new Error("Invalid hex color code");
  }

  return color.darken(percentage).toString();
};

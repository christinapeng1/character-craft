import tinycolor from "tinycolor2";

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
}
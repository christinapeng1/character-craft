import tinycolor from "tinycolor2";

/**
 * Lightens a given hex color by a specified percentage.
 *
 * @param hex - The hex color code to lighten.
 * @param percentage - The percentage by which to lighten the color.
 * @returns The lightened hex color code.
 * @throws {Error} If the provided hex color code is invalid.
 */

export const lightenColor = (hex: string, percentage: number): string => {
  const color = tinycolor(hex);
  if (!color) {
    throw new Error("Invalid hex color code");
  }

  if (color.isDark()) {
    return color.lighten(percentage).toString();
  }

  return color.toString();
};

/**
 * Darkens a given hex color by a specified percentage.
 *
 * @param hex - The hex color code to darken.
 * @param percentage - The percentage by which to darken the color.
 * @returns The darkened hex color code.
 * @throws {Error} If the provided hex color code is invalid.
 */

export const darkenColor = (hex: string, percentage: number): string => {
  const color = tinycolor(hex);
  if (!color) {
    throw new Error("Invalid hex color code");
  }

  return color.darken(percentage).toString();
};
import process from 'node:process'

// Type definition for the color transformation function
type ColorTextFn = (text: string) => string

/**
 * Determines whether color output is allowed based on the NO_COLOR environment variable.
 * @returns {boolean} `true` if color output is allowed, `false` if it is not (when `NO_COLOR` is set).
 */
const isColorAllowed = (): boolean => !process.env.NO_COLOR

/**
 * Wraps a colorization function and only applies it if color output is allowed.
 * If color is not allowed, it returns the text without color.
 *
 * @param {ColorTextFn} callback - The colorization function to apply.
 * @returns {ColorTextFn} A function that applies the color if allowed, otherwise returns plain text.
 */
function colorIfAllowed(callback: ColorTextFn): ColorTextFn {
  return (text: string) => isColorAllowed() ? callback(text) : text
}

// Exported colorization functions that apply different colors to the text.
// Each of these functions is wrapped by `colorIfAllowed` to ensure color is only applied when allowed.

export const yellow = colorIfAllowed((text: string) => `\x1B[38;5;3m${text}\x1B[39m`)

export const consoleLogColor = {
  bold: colorIfAllowed((text: string) => `\x1B[1m${text}\x1B[0m`),
  green: colorIfAllowed((text: string) => `\x1B[32m${text}\x1B[39m`),
  yellow: colorIfAllowed((text: string) => `\x1B[33m${text}\x1B[39m`),
  red: colorIfAllowed((text: string) => `\x1B[31m${text}\x1B[39m`),
  magentaBright: colorIfAllowed((text: string) => `\x1B[95m${text}\x1B[39m`),
  cyanBright: colorIfAllowed((text: string) => `\x1B[96m${text}\x1B[39m`),
}

/**
 * Returns a health message or a custom message.
 * This function is used for checking if the module is working properly.
 *
 * @param {string} customMessage - A custom message to return. Defaults to 'Hello, World!' if not provided.
 * @returns {string} The custom message or the default 'Hello, World!' message.
 */
export function health(customMessage: string = 'Hello, World!'): string {
  return customMessage
}

/**
 * Checks if a value is `undefined`.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if the value is `undefined`, otherwise `false`.
 */
export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined'
}

/**
 * Checks if a value is a non-null object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if the value is an object and not `null`, otherwise `false`.
 */
export function isObject(value: any): value is object {
  return !isNil(value) && typeof value === 'object'
}

/**
 * Checks if a value is a plain object (i.e., an object created by `{}` or `new Object()`).
 *
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if the value is a plain object, otherwise `false`.
 */
export function isPlainObject(value: any): value is object {
  if (!isObject(value)) {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }
  const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (
    typeof ctor === 'function'
    && ctor instanceof ctor
    && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
  )
}

/**
 * Adds a leading slash to a string if it doesn't already have one.
 *
 * @param {string | undefined} path - The path to check and modify.
 * @returns {string} The path with a leading slash if needed, or an empty string if the input is invalid.
 */
export function addLeadingSlash(path?: string): string {
  return path && typeof path === 'string'
    ? path.charAt(0) !== '/' ? `/${path}` : path
    : ''
}

/**
 * Normalizes a path by ensuring it starts with a single slash and removes trailing slashes.
 *
 * @param {string | undefined} path - The path to normalize.
 * @returns {string} The normalized path, ensuring only one leading slash and no trailing slashes.
 */
export function normalizePath(path?: string): string {
  return path
    ? path.startsWith('/')
      ? (`/${path.replace(/\/+$/, '')}`).replace(/\/+/g, '/')
      : `/${path.replace(/\/+$/, '')}`
    : '/'
}

/**
 * Removes the trailing slash from a string if it has one.
 *
 * @param {string} path - The path to strip the trailing slash from.
 * @returns {string} The path without the trailing slash.
 */
export function stripEndSlash(path: string): string {
  return path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path
}

/**
 * Checks if a value is a function.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if the value is a function, otherwise `false`.
 */
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * Checks if a value is a string.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if the value is a string, otherwise `false`.
 */
export const isString = (value: any): value is string => typeof value === 'string'

/**
 * Checks if a value is a number.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if the value is a number, otherwise `false`.
 */
export const isNumber = (value: any): value is number => typeof value === 'number'

/**
 * Checks if a value is the string 'constructor'.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if the value is the string 'constructor', otherwise `false`.
 */
export function isConstructor(value: any): boolean {
  return value === 'constructor'
}

/**
 * Checks if a value is `null` or `undefined`.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if the value is `null` or `undefined`, otherwise `false`.
 */
export function isNil(value: any): value is null | undefined {
  return isUndefined(value) || value === null
}

/**
 * Checks if an array is empty.
 *
 * @param {any} array - The array to check.
 * @returns {boolean} `true` if the array is empty or not an array, otherwise `false`.
 */
export const isEmpty = (array: any): boolean => !(array && array.length > 0)

/**
 * Checks if a value is a symbol.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if the value is a symbol, otherwise `false`.
 */
export const isSymbol = (value: any): value is symbol => typeof value === 'symbol'

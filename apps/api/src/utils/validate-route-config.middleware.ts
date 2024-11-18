import { type IRouteConfig, RequestMethod } from '@/common'
import { isFunction, isPlainObject, isString, stripEndSlash } from '@syncora/utils/shared'

/**
 * Validates a route configuration object
 *
 * @param routeConfig
 * @returns true
 */
export function validateRouteConfig(routeConfig: IRouteConfig): boolean {
  if (!isPlainObject(routeConfig)) {
    throw new Error('Route configuration must be a plain object')
  }

  const { path, method, handler } = routeConfig

  if (!isString(path) || stripEndSlash(path).length === 0) {
    throw new Error('Route path must not be a non-empty string')
  }

  if (!Object.values(RequestMethod).includes(method)) {
    throw new Error(`Invalid HTTP method: ${method}`)
  }

  if (!handler || !isFunction(handler)) {
    throw new Error('Route handler must be a valid function.')
  }
  return true
}

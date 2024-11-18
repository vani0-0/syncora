/**
 * Represents the different levels of logging severity.
 *
 * - `'log'`: General log messages, typically for regular operation info.
 * - `'error'`: Error messages, usually indicating something has gone wrong.
 * - `'warn'`: Warning messages, usually indicating a potential issue.
 * - `'debug'`: Debug messages, useful for troubleshooting and development.
 * - `'verbose'`: Detailed messages for in-depth analysis.
 * - `'fatal'`: Critical errors, indicating a severe failure that usually requires immediate attention.
 */
export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal'

export interface LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]): any

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]): any

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]): any

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]): any

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]): any

  /**
   * Write a 'fatal' level log.
   */
  fatal?(message: any, ...optionalParams: any[]): any

  /**
   * Set log levels.
   * @param levels log levels
   */
  setLogLevels?(levels: LogLevel[]): any
}

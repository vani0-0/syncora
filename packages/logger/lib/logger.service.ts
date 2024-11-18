import type { LogBufferRecord, LoggerService, LoggerServiceOptions, LogLevel } from './interfaces'

import { isNil, isObject } from '@syncora/utils/shared'
import { ConsoleLogger } from './services/console-logger.service'
import { isLogLevelEnabled } from './utils/is-log-level-enabled.util'

const DEFAULT_LOGGER = new ConsoleLogger()

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: '2-digit',
  month: '2-digit',
})

export class Logger implements LoggerService {
  protected static logBuffer = new Array<LogBufferRecord>()
  protected static staticInstanceRef?: LoggerService = DEFAULT_LOGGER
  protected static logLevels?: LogLevel[]
  private static isBufferAttached: boolean

  protected localInstanceRef?: LoggerService

  private static WrapBuffer: MethodDecorator = (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalFunc = descriptor.value as Function

    descriptor.value = function (...args: unknown[]) {
      if (Logger.isBufferAttached) {
        Logger.logBuffer.push({ methodRef: originalFunc.bind(this), arguments: args })
        return
      }
      return originalFunc.call(this, ...args)
    }
  }

  constructor()
  constructor(context: string)
  constructor(context: string, options?: LoggerServiceOptions)
  constructor(protected context?: string, protected options: LoggerServiceOptions = {}) { }

  get localInstance(): LoggerService {
    if (Logger.staticInstanceRef === DEFAULT_LOGGER) {
      return this.registerLocalInstanceRef()
    }
    else if (Logger.staticInstanceRef instanceof Logger) {
      const prototype = Object.getPrototypeOf(Logger.staticInstanceRef)
      if (prototype.constructor === Logger) {
        return this.registerLocalInstanceRef()
      }
    }
    return Logger.staticInstanceRef!
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string): void
  log(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  log(message: any, ...optionalParams: any[]): void {
    optionalParams = this.context ? optionalParams.concat(this.context) : optionalParams
    this.localInstance?.log(message, ...optionalParams)
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, context?: string): void
  error(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  error(message: any, ...optionalParams: any[]): void {
    optionalParams = this.context ? (optionalParams.length ? optionalParams : [undefined]).concat(this.context) : optionalParams
    this.localInstance?.error(message, ...optionalParams)
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, context?: string): void
  warn(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  warn(message: any, ...optionalParams: any[]): void {
    optionalParams = this.context ? optionalParams.concat(this.context) : optionalParams
    this.localInstance?.warn(message, ...optionalParams)
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, context?: string): void
  debug?(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  debug?(message: any, ...optionalParams: any[]): void {
    optionalParams = this.context ? optionalParams.concat(this.context) : optionalParams
    this.localInstance?.debug?.(message, ...optionalParams)
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, context?: string): void
  verbose?(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  verbose?(message: any, ...optionalParams: any[]): void {
    optionalParams = this.context ? optionalParams.concat(this.context) : optionalParams
    this.localInstance?.verbose?.(message, ...optionalParams)
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal?(message: any, context?: string): void
  fatal?(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  fatal?(message: any, ...optionalParams: any[]): void {
    optionalParams = this.context ? optionalParams.concat(this.context) : optionalParams
    this.localInstance?.fatal?.(message, ...optionalParams)
  }

  /**
   * Write a 'log' level log.
   */
  static log(message: any, context?: string): void
  static log(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  static log(message: any, ...optionalParams: any[]): void {
    this.staticInstanceRef?.log?.(message, ...optionalParams)
  }

  /**
   * Write an 'error' level log.
   */
  static error(message: any, context?: string): void
  static error(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  static error(message: any, ...optionalParams: any[]): void {
    this.staticInstanceRef?.error?.(message, ...optionalParams)
  }

  /**
   * Write a 'warn' level log.
   */
  static warn(message: any, context?: string): void
  static warn(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  static warn(message: any, ...optionalParams: any[]): void {
    this.staticInstanceRef?.warn?.(message, ...optionalParams)
  }

  /**
   * Write a 'debug' level log.
   */
  static debug?(message: any, context?: string): void
  static debug?(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  static debug?(message: any, ...optionalParams: any[]): void {
    this.staticInstanceRef?.debug?.(message, ...optionalParams)
  }

  /**
   * Write a 'verbose' level log.
   */
  static verbose?(message: any, context?: string): void
  static verbose?(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  static verbose?(message: any, ...optionalParams: any[]): void {
    this.staticInstanceRef?.verbose?.(message, ...optionalParams)
  }

  /**
   * Write a 'fatal' level log.
   */
  static fatal?(message: any, context?: string): void
  static fatal?(message: any, ...optionalParams: [...any, string?]): void
  @Logger.WrapBuffer
  static fatal?(message: any, ...optionalParams: any[]): void {
    this.staticInstanceRef?.fatal?.(message, ...optionalParams)
  }

  /**
   * Print buffered logs and detach buffer.
   */
  static flush() {
    this.isBufferAttached = false
    this.logBuffer.forEach(item =>
      item.methodRef(...(item.arguments as [string])),
    )
    this.logBuffer = []
  }

  /**
   * Attach buffer.
   * Turns on initialization logs buffering.
   */
  static attachBuffer() {
    this.isBufferAttached = true
  }

  /**
   * Detach buffer.
   * Turns off initialization logs buffering.
   */
  static detachBuffer() {
    this.isBufferAttached = false
  }

  static getTimestamp() {
    return dateTimeFormatter.format(Date.now())
  }

  static isLevelEnabled(level: LogLevel): boolean {
    const logLevels = Logger.logLevels
    return isLogLevelEnabled(level, logLevels)
  }

  static overrideLogger(logger: LoggerService | LogLevel[] | boolean) {
    if (Array.isArray(logger)) {
      Logger.logLevels = logger
      if (!isNil(this.staticInstanceRef)) {
        return this.staticInstanceRef.setLogLevels?.(logger)
      }
    }

    if (isObject(logger)) {
      if (logger instanceof Logger && logger.constructor !== Logger) {
        const errorMessage = `Using the "extends Logger" instruction is not allowed. Please, use "extends ConsoleLogger" instead.`
        if (!isNil(this.staticInstanceRef)) {
          this.staticInstanceRef.error(errorMessage)
        }
        throw new Error(errorMessage)
      }
      this.staticInstanceRef = logger as LoggerService
    }
    else {
      this.staticInstanceRef = undefined
    }
  }

  private registerLocalInstanceRef(): LoggerService {
    if (this.localInstanceRef) {
      return this.localInstanceRef
    }
    this.localInstanceRef = new ConsoleLogger(this.context!, {
      timestamp: this.options?.timestamp,
      logLevels: Logger.logLevels,
    })
    return this.localInstanceRef
  }
}

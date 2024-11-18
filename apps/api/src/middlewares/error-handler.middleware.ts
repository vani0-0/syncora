import type { ApiError } from '@/common/interfaces'
import type { NextFunction, Request, Response } from '@/common/types/express-types'

import process from 'node:process'
import { Environments, HttpStatusCode } from '@/common/enums'
import { Logger } from '@syncora/logger'

export function errorHandler() {
  const logger = new Logger('ErrorHandler', { timestamp: true })
  const isProduction = process.env.NODE_ENV === Environments.PROD

  // Error-handling middleware must have four parameters
  return (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err)
    }
    logger.error(`An error occurred: ${err.message}`, { stack: err.stack })
    const statusCode = err.status || HttpStatusCode.InternalServerError
    const errorResponse = {
      message: isProduction ? 'An error occurred.' : err.message,
      ...(isProduction ? {} : { stack: err.stack }),
    }

    res.status(statusCode).json(errorResponse)
  }
}

import type { NextFunction, Request, Response } from '@/common/types/express-types'

import process from 'node:process'
import { Environments } from '@/common'
import { Logger } from '@syncora/logger'

/**
 *
 * @returns A middleware function that logs request details.
 */
export function requestLogger() {
  const logger = new Logger('RequestLogger', { timestamp: true })
  const isProduction = process.env.NODE_ENV === Environments.PROD

  return (req: Request, res: Response, next: NextFunction): void => {
    if (isProduction) {
      return next()
    }

    res.on('finish', () => {
      const { method, url, status } = { method: req.method, url: req.originalUrl, status: res.statusCode }
      logger.log(`${method} ${url} - ${status}`)
    })
    next()
  }
}

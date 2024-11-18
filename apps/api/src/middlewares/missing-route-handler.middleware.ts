import type { ApiError } from '@/common/interfaces'

import type { NextFunction, Request, Response } from '@/common/types/express-types'
import { HttpStatusCode } from '@/common'

export function missingRouteHandler() {
  return (req: Request, res: Response, next: NextFunction) => {
    const error: ApiError = new Error(`Route not found ${req.originalUrl}`)
    error.status = HttpStatusCode.NotFound
    next(error)
  }
}

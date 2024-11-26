import type { ExpressRouter, Request, Response } from '@/common/types/express-types'

import { HttpStatusCode } from '@/common'
import { health } from '@syncora/utils/shared'
import { Router } from 'express'
import { authRoutes } from './routes/auth.routes'

const appRouter: ExpressRouter = Router()

appRouter.route('/').get((req: Request, res: Response) => {
  const message = health()
  res.status(HttpStatusCode.Ok).json({ message })
})

appRouter.use('/auth', authRoutes)

export default appRouter

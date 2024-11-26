import type { ExpressRouter } from '@/common/types/express-types'

import { Strategies } from '@/common'
import { Router } from 'express'
import passport from 'passport'
import { AuthController } from '../controllers/auth.controller'
import { authService } from '../services'

const authController = new AuthController(authService)

const route: ExpressRouter = Router()

route.route('/login').post(
  passport.authenticate(Strategies.Local, { session: false }),
  authController.login,
)

route.route('/register').post(
  authController.register,
)

export { route as authRoutes }

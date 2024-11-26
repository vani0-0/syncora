import type { NextFunction, Request, Response } from '@/common/types/express-types'
import type { AuthService } from '@/network/services'

import { HttpStatusCode } from '@/common'
import { InternalServerErrorException, UnauthorizedException } from '@syncora/exceptions'

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user

      if (!user) {
        throw new UnauthorizedException('Authentication failed, no user data found.')
      }

      res.sendStatus(HttpStatusCode.Ok).json({ user })
    }
    catch (error: any) {
      next(new InternalServerErrorException(`Login failed: ${error.message}`))
    }
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // await this.authService.register(req.body)
      res.sendStatus(HttpStatusCode.Created).json({ message: this.authService.healthCheck() })
    }
    catch (error: any) {
      next(new InternalServerErrorException(`Registration failed: ${error.message}`))
    }
  }
}

import type { Request } from '@/common/types/express-types'

import process from 'node:process'
import { UnauthorizedException } from '@syncora/exceptions'
import { Logger } from '@syncora/logger'
import { ExtractJwt, Strategy } from 'passport-jwt'

export class RefreshTokenStrategy extends Strategy {
  protected readonly logger = new Logger(RefreshTokenStrategy.name, { timestamp: true })
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const tokenFromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
        const tokenFromCookie = req?.cookies?.refreshToken
        return tokenFromHeader || tokenFromCookie
      },
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    }, async (req: Request, payload: any, done: Function) => {
      await this.validate(req, payload, done)
    })
  }

  async validate(req: Request, payload: any, done: Function) {
    try {
      const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim() || req?.cookies?.refreshToken

      if (!refreshToken) {
        return done(new UnauthorizedException('Refresh token not provided'), false)
      }

      // Verify refresh token in AuthService (e.g., check DB for token validity)
      // const isValid = await this.authService.validateRefreshToken(payload.id, refreshToken);

      // if (!isValid) {
      //   return done(new UnauthorizedException('Invalid refresh token'), false);
      // }

      this.logger.log(`payload: ${JSON.stringify(payload)}`)
      this.logger.log(`refresh token: ${refreshToken}`)
      // Pass user data with the request
      done(null, { ...payload, refreshToken })
    }
    catch (error) {
      done(error, false)
    }
  }
}

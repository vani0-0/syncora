import type { UserService } from '../services/user.service'

import process from 'node:process'
import { UnauthorizedException } from '@syncora/exceptions'
import { Logger } from '@syncora/logger'
import { ExtractJwt, Strategy } from 'passport-jwt'

export class AccessTokenStrategy extends Strategy {
  protected readonly logger = new Logger(AccessTokenStrategy.name, { timestamp: true })
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      algorithms: ['RS256'],
    }, async (payload: any, done: Function) => {
      await this.validate(payload, done)
    })
  }

  async validate(payload: any, done: Function): Promise<any> {
    try {
      const user = await this.userService.findOneById(payload.id)
      if (!user) {
        return done(new UnauthorizedException('User not found'), false)
      }
      this.logger.log(`payload: ${JSON.stringify(payload)}`)
      done(null, payload)
    }
    catch (error) {
      done(error, false)
    }
  }
}

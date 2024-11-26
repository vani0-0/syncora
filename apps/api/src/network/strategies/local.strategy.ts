import type { Account } from '@prisma/client'
import type { AuthService } from '../services/auth.service'

import { UnauthorizedException } from '@syncora/exceptions'
import { Logger } from '@syncora/logger'
import { Strategy } from 'passport-local'

export class LocalStrategy extends Strategy {
  protected readonly logger = new Logger(LocalStrategy.name, { timestamp: true })
  constructor(private readonly authService: AuthService) {
    super(
      { usernameField: 'email' },
      async (email: string, password: string, done: Function) => {
        await this.validate(email, password, done)
      },
    )
  }

  async validate(email: string, password: string, done: Function): Promise<Partial<Account> | undefined> {
    try {
      const user = await this.authService.verifyUser(email, password)
      if (!user) {
        return done(new UnauthorizedException('Incorrect email or password'), false)
      }
      this.logger.log(`payload: ${JSON.stringify(user)}`)
      done(null, user)
    }
    catch (error) {
      done(error, false)
    }
  }
}

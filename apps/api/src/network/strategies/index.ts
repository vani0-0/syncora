import { Strategies } from '@/common/enums'
import passport from 'passport'
import { authService, userService } from '../services'
import { AccessTokenStrategy } from './access-token.strategy'
import { LocalStrategy } from './local.strategy'
import { RefreshTokenStrategy } from './refresh-token.strategy'

import '@/lib/dotenv.lib'

passport.use(Strategies.Local, new LocalStrategy(authService))
passport.use(Strategies.AccessToken, new AccessTokenStrategy(userService))
passport.use(Strategies.RefreshToken, new RefreshTokenStrategy())

export default passport

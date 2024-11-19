import type { AuthService } from '../services/auth.service'

export class AuthController {
  constructor(private readonly authService: AuthService) {}
}

import prisma from '@/lib/prisma.lib'
import { AuthService } from './auth.service'
import { UserService } from './user.service'

export const userService = new UserService(prisma)
export const authService = new AuthService(userService)

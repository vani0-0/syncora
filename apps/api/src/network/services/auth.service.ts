import type { RegisterUserDTO } from '@/validators'
import type { Account } from '@prisma/client'
import type { UserService } from './user.service'
import { ConflictException } from '@syncora/exceptions'

export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async login(loginUserDTO: any) {

  }

  async register(registerUserDTO: RegisterUserDTO) {
    const isUserExist = await this.userService.findOneByEmail(registerUserDTO.email)
    if (isUserExist) {
      throw new ConflictException('Email already in use')
    }
    const { password, ...rest } = registerUserDTO
    const hashPassword = await this.hashData(password)
    const newUser = this.userService.create({ ...rest, password: hashPassword })
    return await this.login(newUser)
  }

  async hashData(data: string) {
    return data
  }
}

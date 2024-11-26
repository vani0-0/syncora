import type { RegisterUserDTO } from '@/validators'
import type { Account } from '@prisma/client'
import type { UserService } from './user.service'
import { ConflictException, NotFoundException, NotImplementedException } from '@syncora/exceptions'
import bcrypt from 'bcrypt'

export class AuthService {
  constructor(private readonly userService: UserService) {}

  healthCheck() {
    return 'from authservice'
  }

  // async verifyUser(email: string, password: string): Promise<Partial<Account> | null> {
  //   const user = await this.userService.findOneByEmail(email)
  //   if (!user) {
  //     throw new NotFoundException('User not found')
  //   }

  //   const passwordMatch = bcrypt.compareSync(password, user.password)

  //   if (passwordMatch) {
  //     const { password, ...rest } = user
  //     return rest
  //   }

  //   return null
  // }

  // async login(loginUserDTO: any) {
  //   // this.logger.log(loginUserDTO)
  //   throw new NotImplementedException('login is not implemented')
  // }

  // async register(registerUserDTO: RegisterUserDTO) {
  //   const isUserExist = await this.userService.findOneByEmail(registerUserDTO.email)
  //   if (isUserExist) {
  //     throw new ConflictException('Email is already in use')
  //   }
  //   const { password, ...rest } = registerUserDTO
  //   const hashPassword = await this.hashData(password)
  //   const newUser = this.userService.create({ ...rest, password: hashPassword })
  //   return await this.login(newUser)
  // }

  // async hashData(data: string) {
  //   return data
  // }
}

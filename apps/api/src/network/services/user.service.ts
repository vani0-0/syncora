import type { CreateUserDTO } from '@/validators'
import type { Account, PrismaClient } from '@prisma/client'

export class UserService {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createUserDTO: CreateUserDTO): Promise<Account> {
    const newUser = await this.prismaService.account.create({
      data: createUserDTO,
    })
    return newUser
  }

  async findOneByEmail(email: string): Promise<Account | null> {
    return await this.prismaService.account.findFirst({
      where: { email },
    })
  }

  async findOneById(id: string) {
    return await this.prismaService.account.findFirst({
      where: { id },
    })
  }
}

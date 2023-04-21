import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../IUsers.repository'

export class PrismaUsersRepository implements IUsersRepository {
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser = await prisma.user.create({
      data,
    })

    return newUser
  }
}

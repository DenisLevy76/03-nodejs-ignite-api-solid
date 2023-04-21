import { prisma } from '@/lib/prisma'
import { CheckIn, Prisma, User } from '@prisma/client'
import { ICheckInsRepository } from '../ICheckIns.repository'

export class PrismaCheckInsRepository implements ICheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<CheckIn | null> {
    return await prisma.checkIn.findUnique({
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

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const newUser = await prisma.checkIn.create({
      data,
    })

    return newUser
  }
}

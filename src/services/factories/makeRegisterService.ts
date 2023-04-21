import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsers.repository'
import { RegisterUserService } from '../registerUser.service'

export const makeRegisterService = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUserService = new RegisterUserService(prismaUsersRepository)

  return registerUserService
}

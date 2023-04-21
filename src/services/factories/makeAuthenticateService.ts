import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsers.repository'
import { AuthenticateService } from '../authenticate.service'

export const makeAuthenticateService = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUserService = new AuthenticateService(prismaUsersRepository)

  return registerUserService
}

import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export interface IRegisterUserService {
  name: string
  email: string
  password: string
}

export const registerUserService = async ({
  email,
  name,
  password,
}: IRegisterUserService) => {
  const password_hash = await hash(password, 5)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Account with same email already exists.')
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash,
    },
  })
}

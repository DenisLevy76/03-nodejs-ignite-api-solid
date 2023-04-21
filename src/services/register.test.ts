import { describe, it, expect } from 'vitest'
import { RegisterUserService } from './registerUser.service'
import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsers.repository'
import { compare } from 'bcryptjs'

describe('Register service', () => {
  it('should create a hash from user password upon registration', async () => {
    const registerService = new RegisterUserService(new PrismaUsersRepository())

    const { user } = await registerService.execute({
      email: 'test@test.com',
      name: 'test',
      password: '123456',
    })

    console.log(user.password_hash)
    const isPasswordCurrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCurrectlyHashed).toEqual(true)
  })
})

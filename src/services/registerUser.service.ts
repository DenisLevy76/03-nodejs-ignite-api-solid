import { IUsersRepository } from '@/repositories/IUsers.repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/emailAlreadyExists.error'
import { User } from '@prisma/client'

export interface IRegisterUserService {
  name: string
  email: string
  password: string
}

interface RegisterUserServiceResponse {
  user: User
}

export class RegisterUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: IRegisterUserService): Promise<RegisterUserServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return { user }
  }
}

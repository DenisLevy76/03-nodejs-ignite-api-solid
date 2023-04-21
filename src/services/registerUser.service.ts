import { IUsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/emailAlreadyExists.error'

export interface IRegisterUserService {
  name: string
  email: string
  password: string
}

export class RegisterUserService {
  constructor(private usersRepository: IUsersRepository) { }

  async execute({ email, name, password }: IRegisterUserService) {
    const password_hash = await hash(password, 5)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    })
  }
}

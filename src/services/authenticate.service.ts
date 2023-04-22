import { IUsersRepository } from '@/repositories/IUsers.repository'
import { InvalidCredentialsError } from './errors/invalidCredentials.error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

export interface AuthenticateServiceRequest {
  email: string
  password: string
}
interface AuthenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private userRepository: IUsersRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new InvalidCredentialsError()

    const doesPasswordsMatches = await compare(password, user.password_hash)

    if (!doesPasswordsMatches) throw new InvalidCredentialsError()

    return { user }
  }
}

import { IUsersRepository } from '@/repositories/users.repository'
import { InvalidCredentialsError } from './errors/invalidCredentials.error'
import { User } from '@prisma/client'

export interface GetUserProfileServiceRequest {
  id: string
}
interface GetUserProfileServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private userRepository: IUsersRepository) { }
  async execute({
    id,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new InvalidCredentialsError()

    return { user }
  }
}

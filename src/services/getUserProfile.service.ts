import { IUsersRepository } from '@/repositories/IUsers.repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/ResourceNotFound.error'

export interface GetUserProfileServiceRequest {
  userId: string
}
interface GetUserProfileServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private userRepository: IUsersRepository) {}
  async execute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) throw new ResourceNotFoundError()

    return { user }
  }
}

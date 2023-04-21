import { CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '@/repositories/ICheckIns.repository'

export interface CheckInServiceRequest {
  userId: string
  gymId: string
}
interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private checkInRepository: ICheckInsRepository) { }
  async execute({
    gymId, userId
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const hasCheckInInTheSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if (hasCheckInInTheSameDay) throw new Error()
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}

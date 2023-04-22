import { CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '@/repositories/ICheckIns.repository'
import { IGymsRepository } from '@/repositories/IGym.repository'
import { ResourceNotFoundError } from './errors/ResourceNotFound.error'
import { getDistanceBetweenCoordinatesInKM } from '@/utils/getDistanceBetweenCoordinates'

export interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLat: number
  userLong: number
}
interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLat,
    userLong,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) throw new ResourceNotFoundError()

    const hasCheckInInTheSameDay =
      await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (hasCheckInInTheSameDay) throw new Error()

    const distance_in_KM = getDistanceBetweenCoordinatesInKM(
      { latitude: userLat, longitude: userLong },
      { latitude: gym.lat.toNumber(), longitude: gym.long.toNumber() },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 100 / 1000

    if (distance_in_KM > MAX_DISTANCE_IN_KILOMETERS) {
      throw Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}

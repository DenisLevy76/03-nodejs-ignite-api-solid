import { InvalidCredentialsError } from '@/services/errors/invalidCredentials.error'
import { makeAuthenticateService } from '@/services/factories/makeAuthenticateService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const authenticateController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateService()

    await authenticateService.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        error: { message: error.message },
      })
    }

    throw error
  }

  return reply.status(200).send()
}

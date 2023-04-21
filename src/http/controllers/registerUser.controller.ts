import { EmailAlreadyExistsError } from '@/services/errors/emailAlreadyExists.error'
import { makeRegisterService } from '@/services/factories/makeRegisterService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const registerUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerUserBodySchema.parse(request.body)

  try {
    const registerUserService = makeRegisterService()

    await registerUserService.execute({ email, name, password })
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({
        error: { message: error.message },
      })
    }

    throw error
  }
  return reply.status(201).send()
}

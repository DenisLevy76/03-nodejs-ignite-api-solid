import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { EmailAlreadyExistsError } from '@/services/errors/emailAlreadyExists.error'
import { RegisterUserService } from '@/services/registerUser.service'
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
    const registerUserService = new RegisterUserService(
      new PrismaUsersRepository(),
    )

    await registerUserService.execute({ email, name, password })
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({
        error: error.message,
      })
    }

    return reply.status(500).send() // TODO: fix me
  }
  return reply.status(201).send()
}

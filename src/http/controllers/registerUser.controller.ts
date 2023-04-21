import { registerUserService } from '@/services/registerUser.service'
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
    registerUserService({ email, name, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}

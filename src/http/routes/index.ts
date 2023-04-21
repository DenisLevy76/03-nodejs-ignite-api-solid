import { FastifyInstance } from 'fastify'
import { registerUserController } from '../controllers/registerUser.controller'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUserController)
}

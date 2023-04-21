import { FastifyInstance } from 'fastify'
import { registerUserController } from '../controllers/registerUser.controller'
import { authenticateController } from '../controllers/authenticate.controller'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateController)
}

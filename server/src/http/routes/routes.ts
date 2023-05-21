import { FastifyInstance } from 'fastify'
import { getAllUser } from '../controllers/get-all-user-controller'

export async function appRoutes(app: FastifyInstance) {
  app.get('/users', getAllUser)
}

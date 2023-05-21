import { FastifyInstance } from 'fastify'
import { registerUser } from '../controllers/user/register-user-controller '

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerUser)
}

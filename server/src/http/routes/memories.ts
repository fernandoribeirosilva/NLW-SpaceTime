import { FastifyInstance } from 'fastify'
import { deleteMemory } from '../controllers/memory/delete-memories-controller'
import { getAllMemories } from '../controllers/memory/get-all-memories-controller'
import { getMemoriesById } from '../controllers/memory/get-memories-by-id-controller'
import { registerMemory } from '../controllers/memory/register-memories-controller'
import { updateMemory } from '../controllers/memory/update-memory-controller'
import { uploadMemory } from '../controllers/memory/upload-memories-controller'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', getAllMemories)

  app.get('/memories/:id', getMemoriesById)

  app.post('/memories', registerMemory)

  app.put('/memories/:id', updateMemory)

  app.post('/memories/uploads', uploadMemory)

  app.delete('/memories/:id', deleteMemory)
}

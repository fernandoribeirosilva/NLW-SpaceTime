import { MemoryNotFoundError } from '@/use-cases/error/memory-not-found-error'
import { makeGetAllMemoryUseCase } from '@/use-cases/factories/make-getAllMemory-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllMemories(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const memories = await makeGetAllMemoryUseCase().execute(request.user.sub)

    return reply.code(200).send(memories)
  } catch (error) {
    if (error instanceof MemoryNotFoundError) {
      return reply.code(401).send({ message: error.message })
    }

    throw error
  }
}

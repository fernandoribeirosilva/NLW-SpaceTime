import { HasNoRegisteredUserError } from '@/use-cases/error/has-no-registered-user-error'
import { makeGetAllMemoryUseCase } from '@/use-cases/factories/make-getAllMemory-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllMemories(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const memories = await makeGetAllMemoryUseCase().execute()

    return reply.code(200).send(memories)
  } catch (error) {
    if (error instanceof HasNoRegisteredUserError) {
      return reply.code(409).send({ message: error.message })
    }

    throw error
  }
}

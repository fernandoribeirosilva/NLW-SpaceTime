import { MemoryNotFoundError } from '@/use-cases/error/memory-not-found-error'
import { makeGetMemoriesByIdUseCase } from '@/use-cases/factories/make-getMemoriesByIdUser-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getMemoriesById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const memory = await makeGetMemoriesByIdUseCase().execute(id)

    return reply.code(200).send(memory)
  } catch (error) {
    if (error instanceof MemoryNotFoundError) {
      return reply.code(409).send({ message: error.message })
    }

    throw error
  }
}

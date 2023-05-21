import { MemoryNotFoundError } from '@/use-cases/error/memory-not-found-error'
import { makeDeleteMemoryUseCase } from '@/use-cases/factories/make-deleteMemory-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteMemory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    id: z.string(),
  })

  const { id } = bodySchema.parse(request.params)

  try {
    await makeDeleteMemoryUseCase().execute(id)

    return reply.code(200).send()
  } catch (error) {
    if (error instanceof MemoryNotFoundError) {
      return reply.code(409).send({ message: error.message })
    }

    throw error
  }
}

import { MemoryNotFoundError } from '@/use-cases/error/memory-not-found-error'
import { makeUpdateMemoryUseCase } from '@/use-cases/factories/make-updateMemoryUseCase-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateMemory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const bodySchema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false),
  })

  const memoryData = bodySchema.parse(request.body)

  try {
    const memory = await makeUpdateMemoryUseCase().execute(id, memoryData)

    return reply.code(200).send(memory)
  } catch (error) {
    if (error instanceof MemoryNotFoundError) {
      return reply.code(409).send({ message: error.message })
    }

    throw error
  }
}

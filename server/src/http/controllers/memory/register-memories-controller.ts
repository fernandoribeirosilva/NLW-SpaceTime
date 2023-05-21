import { MemoryNotFoundError } from '@/use-cases/error/memory-not-found-error'
import { makeRegisterMemoryUseCase } from '@/use-cases/factories/make-registerMemory-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerMemory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false),
  })

  const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

  try {
    const memory = await makeRegisterMemoryUseCase().execute({
      content,
      coverUrl,
      isPublic,
      userId: '7f71aeeb-caec-41f6-86c8-5562c7b7d2c3',
    })

    return reply.code(201).send(memory)
  } catch (error) {
    if (error instanceof MemoryNotFoundError) {
      return reply.code(409).send({ message: error.message })
    }

    throw error
  }
}

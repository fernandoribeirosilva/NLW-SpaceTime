import { ImageIsRequireError } from '@/use-cases/error/image-is-require-error'
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
      userId: request.user.sub,
    })

    return reply.code(201).send(memory)
  } catch (error) {
    if (error instanceof ImageIsRequireError) {
      return reply.code(409).send({ message: error.message })
    }

    throw error
  }
}

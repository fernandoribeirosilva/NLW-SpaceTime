import { MemoryNotFoundError } from '@/use-cases/error/memory-not-found-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-registerUser-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    code: z.string(),
  })

  const { code } = bodySchema.parse(request.body)

  try {
    const token = await makeRegisterUserUseCase().execute({ code }, reply)

    return reply.code(200).send(token)
  } catch (error) {
    if (error instanceof MemoryNotFoundError) {
      return reply.code(409).send({ message: error.message })
    }

    throw error
  }
}

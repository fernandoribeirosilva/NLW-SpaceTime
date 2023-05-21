import { ImageIsRequireError } from '@/use-cases/error/image-is-require-error'
import { makeUploadMemoryUseCase } from '@/use-cases/factories/makeUploadMemory-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'

export async function uploadMemory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const upload = await request.file({
    limits: {
      fileSize: 5_242_880, // 5Mb
    },
  })

  if (!upload) {
    throw new ImageIsRequireError()
  }

  try {
    const token = await makeUploadMemoryUseCase().execute(
      { file: upload },
      request,
    )

    return reply.code(200).send(token)
  } catch (error) {
    if (error instanceof ImageIsRequireError) {
      console.log(error.message)
      return reply.code(400).send({ message: error.message })
    }
  }
}

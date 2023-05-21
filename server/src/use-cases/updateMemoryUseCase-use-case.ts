import { IMemory } from '@/repositories/IMemory-repository'
import { MultipartFile } from '@fastify/multipart'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { extname, resolve } from 'node:path'; // extname retorna a extensão de um arquivo
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

import { FastifyRequest } from 'fastify'
import { ImageIsRequireError } from './error/image-is-require-error'

// interface UpdateMemoryResponse {
//   memory: Memory
// }

// pipeline => verifica quando um processo já chegou ate o final ex uma stream

interface UploadMemoryProps {
  file: MultipartFile
}

const pump = promisify(pipeline)
export class UploadMemoriesUseCase {
  constructor(private memoryRepository: IMemory) {}

  async execute({ file }: UploadMemoryProps, request: FastifyRequest) {
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/ // só vai aceitar video e fotos
    const isValidFileFormat = mimeTypeRegex.test(file.mimetype)

    if (!isValidFileFormat) {
      throw new ImageIsRequireError()
    }

    const fileId = randomUUID()
    const extension = extname(file.filename)

    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads', fileName),
    )

    await pump(file.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl }
  }
}

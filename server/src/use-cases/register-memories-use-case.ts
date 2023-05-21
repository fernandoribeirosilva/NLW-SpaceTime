import { IMemory } from '@/repositories/IMemory-repository'
import { Memory } from '@prisma/client'

interface RegisteMemoryRequest {
  content: string
  coverUrl: string
  isPublic: boolean
  userId: string
}

interface RegisteMemoryResponse {
  memory: Memory
}

export class RegisteMemoryUseCase {
  constructor(private memoryRepository: IMemory) {}

  async execute({
    content,
    coverUrl,
    isPublic,
    userId,
  }: RegisteMemoryRequest): Promise<RegisteMemoryResponse> {
    const memory = await this.memoryRepository.createMemory({
      content,
      coverUrl,
      isPublic,
      userId,
    })

    return {
      memory,
    }
  }
}

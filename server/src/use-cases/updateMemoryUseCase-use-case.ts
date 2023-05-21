import { IMemory } from '@/repositories/IMemory-repository'
import { Memory } from '@prisma/client'

interface UpdateMemoryResponse {
  memory: Memory
}

interface UpdateMemoryProps {
  content: string
  coverUrl: string
  isPublic: boolean
}

export class UpdateMemoryUseCase {
  constructor(private memoryRepository: IMemory) {}

  async execute(
    id: string,
    data: UpdateMemoryProps,
  ): Promise<UpdateMemoryResponse> {
    const memory = await this.memoryRepository.updateMemory(id, data)

    return {
      memory,
    }
  }
}

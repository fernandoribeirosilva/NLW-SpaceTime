import { IMemory } from '@/repositories/IMemory-repository'
import { Memory } from '@prisma/client'
import { MemoryNotFoundError } from './error/memory-not-found-error'

interface GetMemoriesByIdUseCaseResponse {
  memory: Memory
}

export class GetMemoriesByIdUseCase {
  constructor(private memoryRepository: IMemory) {}

  async execute(
    id: string,
    requestUserSub: string,
  ): Promise<GetMemoriesByIdUseCaseResponse> {
    const memory = await this.memoryRepository.findById(id)

    if (!memory?.isPublic && memory?.userId !== requestUserSub) {
      throw new MemoryNotFoundError()
    }

    return {
      memory,
    }
  }
}

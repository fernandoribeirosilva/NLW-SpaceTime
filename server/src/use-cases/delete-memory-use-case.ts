import { IMemory } from '@/repositories/IMemory-repository'
import { MemoryNotFoundError } from './error/memory-not-found-error'

export class GetDeleteMemoryUseCase {
  constructor(private memoryRepository: IMemory) {}

  async execute(id: string, requestUserSub: string): Promise<void> {
    const memory = await this.memoryRepository.findById(id)

    if (memory?.userId !== requestUserSub) {
      throw new MemoryNotFoundError()
    }

    await this.memoryRepository.deleteMemory(id)
  }
}

import { IMemory } from '@/repositories/IMemory-repository'

export class GetDeleteMemoryUseCase {
  constructor(private memoryRepository: IMemory) {}

  async execute(id: string): Promise<void> {
    await this.memoryRepository.deleteMemory(id)
  }
}

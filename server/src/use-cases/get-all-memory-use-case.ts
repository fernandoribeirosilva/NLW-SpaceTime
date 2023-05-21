import { IMemory } from '@/repositories/IMemory-repository'
import { HasNoRegisteredUserError } from './error/has-no-registered-user-error'

type MemoryProps = {
  id: string
  coverUrl: string
  excerpt: string
}

interface GetAllMemoriesUseCaseResponse {
  memories: MemoryProps[]
}

export class GetAllMemoriesUseCase {
  constructor(private memoryRepository: IMemory) {}

  async execute(): Promise<GetAllMemoriesUseCaseResponse> {
    const memoriesData = await this.memoryRepository.getAllMemories()

    if (!memoriesData) {
      throw new HasNoRegisteredUserError()
    }

    const memories = memoriesData.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })

    return {
      memories,
    }
  }
}

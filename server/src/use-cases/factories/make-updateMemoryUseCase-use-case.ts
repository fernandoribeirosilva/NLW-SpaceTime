import { PrismaMemoriesRepository } from '@/repositories/prisma/prisma-memory.repository'
import { UpdateMemoryUseCase } from '../updateMemoryUseCase-use-case'

export function makeUpdateMemoryUseCase() {
  const memoryRepository = new PrismaMemoriesRepository()
  const updateMemory = new UpdateMemoryUseCase(memoryRepository)

  return updateMemory
}

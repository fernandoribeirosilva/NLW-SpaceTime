import { PrismaMemoriesRepository } from '@/repositories/prisma/prisma-memory.repository'
import { GetAllMemoriesUseCase } from '../get-all-memory-use-case'

export function makeGetAllMemoryUseCase() {
  const memoryRepository = new PrismaMemoriesRepository()
  const getAllMemories = new GetAllMemoriesUseCase(memoryRepository)

  return getAllMemories
}

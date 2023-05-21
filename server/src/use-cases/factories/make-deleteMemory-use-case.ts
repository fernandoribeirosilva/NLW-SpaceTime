import { PrismaMemoriesRepository } from '@/repositories/prisma/prisma-memory.repository'
import { GetDeleteMemoryUseCase } from '../delete-memory-use-case'

export function makeDeleteMemoryUseCase() {
  const memoryRepository = new PrismaMemoriesRepository()
  const getMemoriesById = new GetDeleteMemoryUseCase(memoryRepository)

  return getMemoriesById
}

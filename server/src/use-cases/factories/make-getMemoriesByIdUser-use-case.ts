import { PrismaMemoriesRepository } from '@/repositories/prisma/prisma-memory.repository'
import { GetMemoriesByIdUseCase } from '../get-memories-by-id-user-use-case'

export function makeGetMemoriesByIdUseCase() {
  const memoryRepository = new PrismaMemoriesRepository()
  const getMemoriesById = new GetMemoriesByIdUseCase(memoryRepository)

  return getMemoriesById
}

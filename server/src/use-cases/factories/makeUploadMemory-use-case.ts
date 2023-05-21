import { PrismaMemoriesRepository } from '@/repositories/prisma/prisma-memory.repository'
import { UploadMemoriesUseCase } from '../updateMemoryUseCase-use-case'

export function makeUploadMemoryUseCase() {
  const memoryRepository = new PrismaMemoriesRepository()
  const uploadMemory = new UploadMemoriesUseCase(memoryRepository)

  return uploadMemory
}

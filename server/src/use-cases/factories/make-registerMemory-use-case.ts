import { PrismaMemoriesRepository } from '@/repositories/prisma/prisma-memory.repository'
import { RegisteMemoryUseCase } from '../register-memories-use-case'

export function makeRegisterMemoryUseCase() {
  const memoryRepository = new PrismaMemoriesRepository()
  const registeMemory = new RegisteMemoryUseCase(memoryRepository)

  return registeMemory
}

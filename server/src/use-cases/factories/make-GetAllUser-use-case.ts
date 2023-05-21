import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetAllMemoriesUseCase } from '../get-all-user'

export function makeGetAllUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const getAllUserUseCase = new GetAllMemoriesUseCase(userRepository)

  return getAllUserUseCase
}

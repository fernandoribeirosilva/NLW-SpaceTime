import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterUserUseCase } from '../register-user-use-case'

export function makeRegisterUserUseCase() {
  const memoryRepository = new PrismaUserRepository()
  const registerUser = new RegisterUserUseCase(memoryRepository)

  return registerUser
}

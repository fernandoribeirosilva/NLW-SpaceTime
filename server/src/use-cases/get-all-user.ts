import { IUserRepository } from '@/repositories/IUser-repository'
import { User } from '@prisma/client'
import { HasNoRegisteredUserError } from './error/has-no-registered-user-error'

interface GetAllMemoriesUseCaseResponse {
  users: User[]
}

export class GetAllMemoriesUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<GetAllMemoriesUseCaseResponse> {
    const users = await this.userRepository.getAllUser()

    if (!users) {
      throw new HasNoRegisteredUserError()
    }

    return {
      users,
    }
  }
}

import { Prisma, User } from '@prisma/client'
import { IUserRepository } from '../IUser-repository'

export class PrismaUserRepository implements IUserRepository {
  getAllUser(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    throw new Error('Method not implemented.')
  }
}

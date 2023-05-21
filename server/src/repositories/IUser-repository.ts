import { Prisma, User } from '@prisma/client'

export interface IUserRepository {
  getAllUser(): Promise<User[]>
  findById(id: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}

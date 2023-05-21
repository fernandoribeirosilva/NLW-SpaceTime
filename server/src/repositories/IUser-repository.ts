import { Prisma, User } from '@prisma/client'

export interface IUserRepository {
  getAllUser(): Promise<User[]>
  findById(id: number): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}

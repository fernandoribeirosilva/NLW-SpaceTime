import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { IUserRepository } from '../IUser-repository'

export class PrismaUserRepository implements IUserRepository {
  getAllUser(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  async findById(id: number) {
    return await prisma.user.findUnique({
      where: {
        githubId: id,
      },
    })
  }

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    })
  }
}

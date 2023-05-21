import { prisma } from '@/lib/prisma'
import { Memory, Prisma } from '@prisma/client'
import { IMemory } from '../IMemory-repository'

export class PrismaMemoriesRepository implements IMemory {
  async getAllMemories() {
    return await prisma.memory.findMany({
      orderBy: {
        created_at: 'asc',
      },
    })
  }

  async findById(id: string) {
    return await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })
  }

  async updateMemory(
    id: string,
    data: Prisma.MemoryUpdateInput,
  ): Promise<Memory> {
    return prisma.memory.update({
      where: {
        id,
      },
      data,
    })
  }

  async createMemory(data: Prisma.MemoryUncheckedCreateInput) {
    return await prisma.memory.create({
      data,
    })
  }

  async deleteMemory(id: string) {
    await prisma.memory.delete({
      where: {
        id,
      },
    })
  }
}

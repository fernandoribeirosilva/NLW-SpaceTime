import { Memory, Prisma } from '@prisma/client'

export interface IMemory {
  getAllMemories(id: string): Promise<Memory[]>
  findById(id: string): Promise<Memory | null>
  createMemory(data: Prisma.MemoryUncheckedCreateInput): Promise<Memory>
  deleteMemory(id: string): Promise<void>
  updateMemory(id: string, data: Prisma.MemoryUpdateInput): Promise<Memory>
}

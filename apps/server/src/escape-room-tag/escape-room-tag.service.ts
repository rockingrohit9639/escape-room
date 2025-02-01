import { HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { EscapeRoomTagRequestShapes, EscapeRoomTagResponseShapes } from './escape-room-tag.types'

@Injectable()
export class EscapeRoomTagService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    query,
  }: EscapeRoomTagRequestShapes['findAll']['query']): Promise<EscapeRoomTagResponseShapes['findAll']> {
    const tags = await this.prisma.escapeRoomTag.findMany({
      where: { name: query ? { contains: query } : undefined },
      omit: { roomIds: true },
      take: 15,
    })

    return {
      status: HttpStatus.OK,
      body: tags,
    }
  }
}

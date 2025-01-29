import { HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { EscapeRoomRequestShapes, EscapeRoomResponseShapes } from './escape-room.types'
import { SessionUser } from '../auth/auth.types'
import { omit } from 'radash'

@Injectable()
export class EscapeRoomService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewRoom(
    body: EscapeRoomRequestShapes['new']['body'],
    user: SessionUser,
  ): Promise<EscapeRoomResponseShapes['new']> {
    const roomCreated = await this.prisma.escapeRoom.create({
      data: {
        ...omit(body, ['tags']),
        label: body.label,
        description: body.description,
        difficulty: body.difficulty,
        visibility: body.visibility,
        tags: { connect: body.tags.map((tag) => ({ id: tag })) },
        createdById: user.id,
      },
    })

    return {
      status: HttpStatus.CREATED,
      body: { id: roomCreated.id },
    }
  }
}

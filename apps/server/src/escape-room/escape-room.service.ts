import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { EscapeRoomRequestShapes, EscapeRoomResponseShapes } from './escape-room.types'
import { SessionUser } from '../auth/auth.types'
import { omit } from 'radash'
import { escapeRoomContract } from '@escape-room/contracts'

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

  async findAll(user: SessionUser): Promise<EscapeRoomResponseShapes['findAll']> {
    const escapeRooms = await this.prisma.escapeRoom.findMany({
      where: { createdById: user.id },
    })

    return {
      status: HttpStatus.OK,
      body: escapeRoomContract.findAll.responses['200'].parse(escapeRooms),
    }
  }

  async findOneById(
    params: EscapeRoomRequestShapes['findOneById']['params'],
    user: SessionUser,
  ): Promise<EscapeRoomResponseShapes['findOneById']> {
    const escapeRoom = await this.prisma.escapeRoom.findUnique({
      where: { id: params.escapeRoomId, createdById: user.id },
    })

    if (!escapeRoom) {
      throw new NotFoundException('Escape room not found.')
    }

    return {
      status: 200,
      body: escapeRoom,
    }
  }
}

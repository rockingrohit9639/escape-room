import { HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { SessionUser } from '../auth/auth.types'
import { StageRequestShapes, StageResponseShapes } from './stage.types'

@Injectable()
export class StageService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewStage(
    { body, params }: StageRequestShapes['new'],
    user: SessionUser,
  ): Promise<StageResponseShapes['new']> {
    const stage = await this.prisma.stage.create({
      select: { id: true },
      data: {
        label: body.label,
        description: body.description,
        background: body.background,
        order: 0, // @TODO Calculate order
        timeLimit: body.timeLimit,
        escapeRoom: {
          connect: {
            id: params.escapeRoomId,
            createdById: user.id,
          },
        },
      },
    })

    return {
      status: HttpStatus.OK,
      body: { id: stage.id },
    }
  }
}

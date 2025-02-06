import { BadRequestException, ForbiddenException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { SessionUser } from '../auth/auth.types'
import { StageRequestShapes, StageResponseShapes } from './stage.types'
import { newStageSchema, stageContract } from '@escape-room/contracts'
import { FileService } from '../file/file.service'

@Injectable()
export class StageService {
  constructor(private readonly prisma: PrismaService, private readonly fileService: FileService) {}

  async createNewStage(
    { body, params }: StageRequestShapes['new'],
    thumbnail: Express.Multer.File,
    user: SessionUser,
  ): Promise<StageResponseShapes['new']> {
    const jsonBody = JSON.parse(JSON.parse(body.stageData))
    const response = newStageSchema.omit({ thumbnail: true }).safeParse(jsonBody)

    if (!response.success) {
      throw new BadRequestException('Invalid payload.')
    }

    const thumbnailUploaded = await this.fileService.uploadFile(
      {
        file: thumbnail,
        visibility: 'PUBLIC',
        bucket: 'thumbnails',
      },
      user,
    )

    const payload = response.data

    const stage = await this.prisma.stage.create({
      select: { id: true },
      data: {
        label: payload.label,
        description: payload.description,
        background: payload.background,
        order: 0, // @TODO Calculate order
        timeLimit: payload.timeLimit,
        escapeRoom: {
          connect: {
            id: params.escapeRoomId,
            createdById: user.id,
          },
        },
        thumbnail: {
          connect: { id: thumbnailUploaded.id },
        },
      },
    })

    return {
      status: HttpStatus.OK,
      body: { id: stage.id },
    }
  }

  async removeStage(stageId: string, user: SessionUser): Promise<StageResponseShapes['remove']> {
    const stage = await this.prisma.stage.findFirst({
      where: { id: stageId },
      select: { id: true, escapeRoom: { select: { createdById: true } } },
    })
    if (stage.escapeRoom.createdById !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this stage.')
    }

    const deletedStage = await this.prisma.stage.delete({
      where: { id: stage.id },
      select: { id: true },
    })

    return {
      status: HttpStatus.OK,
      body: deletedStage,
    }
  }

  async findAllByEscapeRoom(
    escapeRoomId: string,
    user: SessionUser,
  ): Promise<StageResponseShapes['findAllByEscapeRoom']> {
    const stages = await this.prisma.stage.findMany({
      where: { escapeRoom: { id: escapeRoomId, createdById: user.id } },
      include: {
        thumbnail: { select: { id: true, url: true } },
      },
    })

    return {
      status: HttpStatus.OK,
      body: stageContract.findAllByEscapeRoom.responses['200'].parse(stages),
    }
  }
}

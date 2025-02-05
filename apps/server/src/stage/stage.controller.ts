import { Controller, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { StageService } from './stage.service'
import { nestControllerContract, TsRest, TsRestRequest } from '@ts-rest/nest'
import { stageContract } from '@escape-room/contracts'
import { StageRequestShapes, StageResponseShapes } from './stage.types'
import { User } from '../user/user.decorator'
import { SessionUser } from '../auth/auth.types'
import { IsAuthGuard } from '../auth/guards/is-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'

const c = nestControllerContract(stageContract)

@UseGuards(IsAuthGuard)
@Controller()
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @TsRest(c.new)
  @UseInterceptors(FileInterceptor('thumbnail'))
  async createNewStage(
    @TsRestRequest() payload: StageRequestShapes['new'],
    @UploadedFile() thumbnail: Express.Multer.File,
    @User() user: SessionUser,
  ): Promise<StageResponseShapes['new']> {
    return this.stageService.createNewStage(payload, thumbnail, user)
  }

  @TsRest(c.remove)
  async removeStage(
    @TsRestRequest() { params }: StageRequestShapes['remove'],
    @User() user: SessionUser,
  ): Promise<StageResponseShapes['remove']> {
    return this.stageService.removeStage(params.stageId, user)
  }
}

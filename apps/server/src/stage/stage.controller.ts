import { Controller, UseGuards } from '@nestjs/common'
import { StageService } from './stage.service'
import { nestControllerContract, TsRest, TsRestRequest } from '@ts-rest/nest'
import { stageContract } from '@escape-room/contracts'
import { StageRequestShapes, StageResponseShapes } from './stage.types'
import { User } from '../user/user.decorator'
import { SessionUser } from '../auth/auth.types'
import { IsAuthGuard } from '../auth/guards/is-auth.guard'

const c = nestControllerContract(stageContract)

@UseGuards(IsAuthGuard)
@Controller()
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @TsRest(c.new)
  async createNewStage(
    @TsRestRequest() payload: StageRequestShapes['new'],
    @User() user: SessionUser,
  ): Promise<StageResponseShapes['new']> {
    return this.stageService.createNewStage(payload, user)
  }
}

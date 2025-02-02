import { Controller, UseGuards } from '@nestjs/common'
import { EscapeRoomService } from './escape-room.service'
import { nestControllerContract, TsRest, TsRestRequest } from '@ts-rest/nest'
import { escapeRoomContract } from '@escape-room/contracts'
import { EscapeRoomRequestShapes, EscapeRoomResponseShapes } from './escape-room.types'
import { User } from '../user/user.decorator'
import { SessionUser } from '../auth/auth.types'
import { IsAuthGuard } from '../auth/guards/is-auth.guard'

const c = nestControllerContract(escapeRoomContract)

@UseGuards(IsAuthGuard)
@Controller()
export class EscapeRoomController {
  constructor(private readonly escapeRoomService: EscapeRoomService) {}

  @TsRest(c.new)
  async createNewRoom(
    @TsRestRequest() { body }: EscapeRoomRequestShapes['new'],
    @User() user: SessionUser,
  ): Promise<EscapeRoomResponseShapes['new']> {
    return this.escapeRoomService.createNewRoom(body, user)
  }

  @TsRest(c.findAll)
  async findAll(@User() user: SessionUser): Promise<EscapeRoomResponseShapes['findAll']> {
    return this.escapeRoomService.findAll(user)
  }

  @TsRest(c.findOneById)
  async findOneById(@TsRestRequest() { params }: EscapeRoomRequestShapes['findOneById'], @User() user: SessionUser) {
    return this.escapeRoomService.findOneById(params, user)
  }
}

import { Controller, UseGuards } from '@nestjs/common'
import { EscapeRoomTagService } from './escape-room-tag.service'
import { nestControllerContract, TsRest, TsRestRequest } from '@ts-rest/nest'
import { escapeRoomTagContract } from 'packages/contracts/src/escape-room-tag.contract'
import { EscapeRoomTagRequestShapes, EscapeRoomTagResponseShapes } from './escape-room-tag.types'
import { IsAuthGuard } from '../auth/guards/is-auth.guard'

const c = nestControllerContract(escapeRoomTagContract)

@UseGuards(IsAuthGuard)
@Controller()
export class EscapeRoomTagController {
  constructor(private readonly escapeRoomTagService: EscapeRoomTagService) {}

  @TsRest(c.findAll)
  async findAll(
    @TsRestRequest() { query }: EscapeRoomTagRequestShapes['findAll'],
  ): Promise<EscapeRoomTagResponseShapes['findAll']> {
    return this.escapeRoomTagService.findAll(query)
  }
}

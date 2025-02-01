import { Module } from '@nestjs/common'
import { EscapeRoomTagController } from './escape-room-tag.controller'
import { EscapeRoomTagService } from './escape-room-tag.service'

@Module({
  imports: [],
  controllers: [EscapeRoomTagController],
  providers: [EscapeRoomTagService],
})
export class EscapeRoomTagModule {}

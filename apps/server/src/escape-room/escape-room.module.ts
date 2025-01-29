import { Module } from '@nestjs/common'
import { EscapeRoomController } from './escape-room.controller'
import { EscapeRoomService } from './escape-room.service'

@Module({
  imports: [],
  controllers: [EscapeRoomController],
  providers: [EscapeRoomService],
})
export class EscapeRoomModule {}

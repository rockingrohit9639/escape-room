import { Module } from '@nestjs/common'
import { StageController } from './stage.controller'
import { StageService } from './stage.service'

@Module({
  imports: [],
  controllers: [StageController],
  providers: [StageService],
})
export class StageModule {}

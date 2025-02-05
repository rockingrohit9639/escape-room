import { Module } from '@nestjs/common'
import { StageController } from './stage.controller'
import { StageService } from './stage.service'
import { FileModule } from '../file/file.module'

@Module({
  imports: [FileModule],
  controllers: [StageController],
  providers: [StageService],
})
export class StageModule {}

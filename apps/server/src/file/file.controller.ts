import { Controller, Get, Param, UseGuards } from '@nestjs/common'

import { IsAuthGuard } from '../auth/guards/is-auth.guard'
import { FileService } from './file.service'
import { User } from '../user/user.decorator'
import { SessionUser } from '../auth/auth.types'

@UseGuards(IsAuthGuard)
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/file/:filename')
  async streamFile(@Param('filename') filename: string, @User() user: SessionUser) {
    return this.fileService.streamFile(filename, user)
  }
}

import { Controller, UseGuards } from '@nestjs/common'

import { IsAuthGuard } from '../auth/guards/is-auth.guard'
import { FileService } from './file.service'

@UseGuards(IsAuthGuard)
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}
}

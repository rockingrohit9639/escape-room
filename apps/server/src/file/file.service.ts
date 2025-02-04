import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { SessionUser } from '../auth/auth.types'
import { UploadFileArgs } from './file.types'
import { Client } from 'minio'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { ConfigService } from '@nestjs/config'
import { Env } from '../lib/env'

@Injectable()
export class FileService {
  constructor(
    @Inject('MINIO_CLIENT') private readonly minioClient: Client,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService<Env>,
  ) {}

  async uploadFile({ file, visibility, bucket = 'public' }: UploadFileArgs, user: SessionUser) {
    const filename = uuidv4()

    const objectName = [user.id, bucket, dayjs().format('DD/MM/YYYY'), filename].join('/')

    try {
      await this.minioClient.putObject(bucket, objectName, file.buffer, file.size, { visibility })

      const fileRecord = await this.prisma.file.create({
        data: {
          bucket,
          filename,
          mimetype: file.mimetype,
          uploadedById: user.id,
          visibility,
          url: this.generateFileUrl(filename),
        },
        select: { id: true },
      })

      return fileRecord
    } catch {
      await this.minioClient.removeObject(bucket, objectName)
      throw new InternalServerErrorException('Something went wrong while uploading file.')
    }
  }

  generateFileUrl(filename: string) {
    return `${this.configService.get('SERVER_URL')}/file/${filename}`
  }
}

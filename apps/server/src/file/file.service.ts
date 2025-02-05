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
    const ext = file.originalname.split('.').at(-1)
    const filename = [uuidv4(), ext].join('.')

    const objectName = [user.id, dayjs().format('DD-MM-YYYY'), filename].join('/')

    try {
      /* Create bucket if not exists */
      if (!(await this.minioClient.bucketExists(bucket))) {
        await this.minioClient.makeBucket(bucket)
      }

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
    } catch (error) {
      console.log(error)
      await this.minioClient.removeObject(bucket, objectName)
      throw new InternalServerErrorException('Something went wrong while uploading file.')
    }
  }

  generateFileUrl(filename: string) {
    return `${this.configService.get('SERVER_URL')}/file/${filename}`
  }
}

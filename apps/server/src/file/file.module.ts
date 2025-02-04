import { Module } from '@nestjs/common'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { ConfigService } from '@nestjs/config'
import { Env } from '../lib/env'
import { Client } from 'minio'

@Module({
  imports: [],
  controllers: [FileController],
  providers: [
    FileService,
    {
      provide: 'MINIO_CLIENT',
      useFactory: (configService: ConfigService<Env>) =>
        new Client({
          endPoint: configService.get('STORAGE_ENDPOINT'),
          port: configService.get('STORAGE_PORT'),
          useSSL: configService.get('STORAGE_USE_SSL'),
          accessKey: configService.get('STORAGE_ACCESS_KEY'),
          secretKey: configService.get('STORAGE_SECRET_KEY'),
          region: configService.get('STORAGE_REGION'),
        }),
      inject: [ConfigService],
    },
  ],
})
export class FileModule {}

import { fileContract } from '@escape-room/contracts'
import { FileVisibility } from '@prisma/client'
import { NestRequestShapes, NestResponseShapes } from '@ts-rest/nest'
import 'multer'

export type FileRequestShapes = NestRequestShapes<typeof fileContract>
export type FileResponseShapes = NestResponseShapes<typeof fileContract>

export type FileBucket = 'public' | 'thumbnails'

export type UploadFileArgs = {
  file: Express.Multer.File
  visibility: FileVisibility
  bucket?: FileBucket
}

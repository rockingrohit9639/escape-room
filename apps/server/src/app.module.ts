import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from './lib/env'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { EscapeRoomModule } from './escape-room/escape-room.module'
import { EscapeRoomTagModule } from './escape-room-tag/escape-room-tag.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    EscapeRoomModule,
    EscapeRoomTagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

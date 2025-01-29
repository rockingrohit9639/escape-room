import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from './lib/env'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { EscapeRoomModule } from './escape-room/escape-room.module'

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

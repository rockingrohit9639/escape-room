import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { SessionSerializer } from './session.serializer'
import { AuthService } from './auth.service'
import { AuthStrategy } from './auth.strategy'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    PassportModule.register({
      property: 'user',
      session: true,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, SessionSerializer],
})
export class AuthModule {}

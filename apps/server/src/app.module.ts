import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './lib/env';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

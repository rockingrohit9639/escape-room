import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from './lib/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** All API routes start with /api */
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService<Env>);

  const PORT = configService.get('PORT');
  await app.listen(configService.get(PORT));
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`
  );
}

bootstrap();

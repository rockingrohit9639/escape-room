import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from './lib/env';
import { HttpExceptionFilter } from './lib/http-exception-filter';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Env>);
  const logger = new Logger('bootstrap');

  /** All API routes start with /api */
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    credentials: true,
    origin: configService.get('CORS_ORIGIN'),
  });

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: configService.get('SESSION_COOKIE_MAX_AGE'),
        sameSite: 'lax',
        httpOnly: true,
        secure: configService.get('NODE_ENV') === 'production',
      },
      store: new PrismaSessionStore(new PrismaClient(), {
        // PrismaSessionStore will automatically remove expired sessions
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
      }),
    })
  );

  app.use(passport.session());
  app.use(cookieParser());

  const PORT = configService.get('PORT');
  await app.listen(Number(PORT));
  logger.log(`🚀 Listening on: http://localhost:${PORT}/${globalPrefix}`);
}

bootstrap();

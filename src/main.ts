/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { AppModule } from '@/modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import swaggerBootstrap from './utils/swagger.bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const globalPrefix = config.get('APP_GLOBAL_PREFIX');
  const port = config.get('APP_PORT');
  const env = config.get('ENV');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());

  if (env !== 'production') {
    swaggerBootstrap(app, globalPrefix);

    Logger.log(
      `
    🚀 Application is running in DEVELOPMENT mode on:
    http://localhost:${port}/${globalPrefix}
    Swagger API DOCS available at:
    http://localhost:${port}/${globalPrefix}/docs
    `,
    );
  }

  await app.listen(port);
}

bootstrap();

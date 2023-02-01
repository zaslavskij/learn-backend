import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default function swaggerBootstrap(
  app: INestApplication,
  apiVersion: string,
): void {
  const config = new DocumentBuilder()
    .setTitle('Docs example')
    .setDescription('Boilerplate API')
    .setVersion(apiVersion)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiVersion}/docs`, app, document);
}

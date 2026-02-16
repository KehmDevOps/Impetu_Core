import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SystemConstants } from './constants/system.constants';
import { SystemHeaders } from './constants/systemHeaders.constants';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigins: string | undefined = process.env.CORS_ORIGINS_IMPETU_APP;
  const allowedOrigins: string[] = corsOrigins ? corsOrigins.split(',').map(o => o.trim()) : [];

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
    methods: SystemConstants.ALLOWED_METHODS,
    allowedHeaders: [
      SystemHeaders.AUTHORIZATION,
      SystemHeaders.CONTENT_TYPE
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`); //TODO: Remove this
}
bootstrap();

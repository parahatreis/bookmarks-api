import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enabling global pipes for validations
  // whiteList removes extra data
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3333);
}
bootstrap();

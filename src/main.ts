import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // added Global Pipe for validation for requests
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();

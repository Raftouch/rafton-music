import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function start() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;
  const allowedOrigins = ['http://client:3024', 'http://localhost:3001'];

  app.use(cookieParser());
  app.enableCors({ origin: allowedOrigins, credentials: true });
  // app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Rafton')
    .setDescription('The Rafton API description')
    .setVersion('0.1')
    .addBearerAuth() // to authorize queries for protected routes in swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
start();

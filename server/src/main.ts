import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { urlencoded } from 'express';
// import * as express from 'express';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });

  const config = new DocumentBuilder()
    .setTitle('Rafton')
    .setDescription('The Rafton API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.use(urlencoded({ extended: true }));
  // app.use(express.json());
  await app.listen(5000);
}
start();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { urlencoded } from 'express';
// import * as express from 'express';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  // app.use(urlencoded({ extended: true }));
  // app.use(express.json());
  await app.listen(5000);
}
start();

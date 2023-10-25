import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port, () => console.log(`App listening on port ${port}`));
}

start();

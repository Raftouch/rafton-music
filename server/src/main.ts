import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function start() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;
  app.enableCors({ origin: true });

  const config = new DocumentBuilder()
    .setTitle('Rafton')
    .setDescription('The Rafton API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
start();

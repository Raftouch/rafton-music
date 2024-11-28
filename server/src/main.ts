import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function start() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
});
  // const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3024',
    'http://portainer-cda3b.dev-formation.com:3024',
  ];

  app.use(cookieParser());
  // app.enableCors({
  //   origin: (origin, callback) => {
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, origin); // Renvoie l'origine spécifique
  //     } else {
  //       callback(new Error('Not allowed by CORS')); // Rejette l'origine non autorisée
  //     }
  //   },
  //   credentials: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   allowedHeaders: 'Content-Type, Accept, Authorization, Cookie, Origin',
  // });
  // app.enableCors({
  //   // origin: allowedOrigins,
  //   origin: 'http://portainer-cda3b.dev-formation.com:3024',
  //   credentials: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   allowedHeaders: 'Content-Type, Accept, Authorization, Cookie, Origin',
  //   preflightContinue: false,
  // });
  // app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Rafton')
    .setDescription('The Rafton API description')
    .setVersion('0.1')
    // .addBearerAuth() // to authorize queries for protected routes in swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
start();

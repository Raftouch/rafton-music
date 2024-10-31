import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { CORSMiddleware } from 'cors.middleware';

async function start() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;
  // const allowedOrigins = ['http://localhost:3024', 'http://localhost:3000', 'http://127.0.0.1:3000'];

  // const allowedOrigins =
  //   process.env.NODE_ENV === 'production'
  //     ? [
  //         'http://portainer-cda3b.dev-formation.com:3024',
  //         'http://portainer-cda3b.dev-formation.com:5000',
  //       ]
  //     : ['http://localhost:3000', 'http://localhost:3024'];

  // const allowedOrigins = [
  //   'http://localhost:3000',
  //   'http://localhost:3024',
  //   'http://portainer-cda3b.dev-formation.com:3024',
  // ];

  app.use(cookieParser());
  app.use(new CORSMiddleware().use);
  // app.enableCors({
  //   origin: allowedOrigins,
  //   // origin: true,
  //   credentials: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   allowedHeaders: 'Content-Type, Accept, Authorization, Cookie, Origin',
  //   // preflightContinue: false,
  // });
  // app.useGlobalPipes(new ValidationPipe());

  // app.enableCors({
  //   origin: (origin, callback) => {
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   credentials: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   allowedHeaders: 'Content-Type, Accept, Authorization, Cookie, Origin',
  //   preflightContinue: false,
  // });

  // app.enableCors({
  //   origin: allowedOrigins,
  //   credentials: true,
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: [
  //     'Content-Type',
  //     'Accept',
  //     'Authorization',
  //     'X-Requested-With',
  //     'Access-Control-Allow-Origin',
  //     'Access-Control-Allow-Credentials',
  //   ],
  // });

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

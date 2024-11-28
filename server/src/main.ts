import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function start() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3024',
    'http://portainer-cda3b.dev-formation.com:3024',
  ];

  app.use(cookieParser());

  // app.use((req, res, next) => {
  //   console.log(`Requête reçue : ${req.method} ${req.url}`);
  //   console.log(`Origine : ${req.headers.origin}`);
  //   console.log(`Headers :`, req.headers);
  //   next();
  // });
  
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });
  
  
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

  app.use((req, res, next) => {
    // Check for OPTIONS method (preflight request)
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', 'http://portainer-cda3b.dev-formation.com:3024'); // Set allowed origin
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Cookie, Origin');
      res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, auth tokens)
      return res.status(204).end(); // 204 No Content response for preflight
    }
    next();
  });

  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, origin); // Accept the request if the origin matches
      } else {
        callback(new Error('Not allowed by CORS')); // Reject if the origin is not allowed
      }
    },
    credentials: true, // Allow credentials (cookies, auth tokens)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed methods
    allowedHeaders: 'Content-Type, Accept, Authorization, Cookie, Origin', // Allowed headers
    preflightContinue: false, // Let NestJS handle preflight requests
  });

  // app.enableCors({
  //   origin: allowedOrigins,
  //   // origin: 'http://portainer-cda3b.dev-formation.com:3024',
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

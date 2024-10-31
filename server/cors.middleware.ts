import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CORSMiddleware implements NestMiddleware {
  private allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3024',
    'http://portainer-cda3b.dev-formation.com:3024',
  ];

  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin;
    console.log('Request Origin:', origin); // Log the request origin

    if (this.allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      console.log('CORS header set for:', origin); // Log when CORS header is set
    } else {
      console.warn('Origin not allowed:', origin); // Log for disallowed origins
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return res.status(204).send();
    }

    next();
  }
}

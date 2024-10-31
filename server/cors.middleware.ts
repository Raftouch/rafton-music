import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CORSMiddleware implements NestMiddleware {
  // Define allowed origins
  private allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3024',
    'http://portainer-cda3b.dev-formation.com:3024',
  ];

  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin;

    // Check if the request origin is in the allowed origins
    if (this.allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(204).send();
    }

    next();
  }
}

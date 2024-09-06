import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): { message: string } {
    console.log('Get Hello Cookies : ', req.cookies);
    return this.appService.getHello();
  }
}

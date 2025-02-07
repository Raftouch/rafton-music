import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth-register.dto';
import { LoginDto } from './dto/auth-login.dto';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtRefreshAuthGuard } from './guards/refresh-token.guard';
import { JwtAuthGuard } from './guards/access-token.guard';
import { User } from '@prisma/client';
import { LoginEntity } from './entities/auth-login.entity';
import { RegisterEntity } from './entities/auth-register.entity';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // public route
  @Post('register')
  @ApiCreatedResponse({ type: RegisterEntity })
  register(
    @Body() authDto: RegisterDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.register(authDto, req, res);
  }

  // public route
  @Post('login')
  @ApiCreatedResponse({ type: LoginEntity })
  login(@Body() authDto: LoginDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.login(authDto, req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    return this.authService.logout(req, res, user['id']);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-auth')
  checkAuth(@Req() req: Request, @Res() res: Response) {
    return this.authService.checkAuth(req, res);
  }

  // private route
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    return this.authService.refreshToken(
      user['id'],
      user['refreshToken'],
      req,
      res,
    );
  }
}

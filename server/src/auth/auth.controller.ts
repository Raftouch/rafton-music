import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth-register.dto';
import { LoginDto } from './dto/auth-login.dto';
import { Request, Response } from 'express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() authDto: RegisterDto) {
    return this.authService.register(authDto);
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() authDto: LoginDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.login(authDto, req, res);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @Post('refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}

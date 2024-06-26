import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth-register.dto';
import { LoginDto } from './dto/auth-login.dto';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // public route
  @Post('register')
  @ApiCreatedResponse({ type: AuthEntity })
  register(
    @Body() authDto: RegisterDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.register(authDto, req, res);
  }

  // public route
  @Post('login')
  @ApiCreatedResponse({ type: AuthEntity })
  login(@Body() authDto: LoginDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.login(authDto, req, res);
  }

  // private route
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  // private route
  @Post('refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}

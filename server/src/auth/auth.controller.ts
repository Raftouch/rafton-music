import {
  Body,
  Controller,
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
import { AuthEntity } from './entities/auth.entity';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    return this.authService.logout(req, res, user['id']);
  }

  // private route
  @UseGuards(AuthGuard('jwt-refresh'))
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

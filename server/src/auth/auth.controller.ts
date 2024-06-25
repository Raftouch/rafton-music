import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() authDto: RegisterDto) {
    return this.authService.register(authDto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Get('logout')
  logout() {
    return this.authService.logout();
  }
}

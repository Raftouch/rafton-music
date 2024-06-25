import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register() {
    return 'Register route';
  }

  @Post('login')
  login() {
    return 'Login route';
  }

  @Get('logout')
  logout() {
    return 'Logout route';
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async register() {
    return { message: 'Register successful' };
  }

  async login() {
    return { message: 'Login successful' };
  }

  async logout() {
    return { message: 'Logout successful' };
  }
}

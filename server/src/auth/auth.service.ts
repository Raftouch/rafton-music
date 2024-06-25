import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(authDto: RegisterDto) {
    const { username, email, password, role } = authDto;

    const usernameAlreadyInUse = await this.prisma.user.findUnique({
      where: { username },
    });

    const emailAlreadyInUse = await this.prisma.user.findUnique({
      where: { email },
    });

    if (usernameAlreadyInUse) {
      throw new BadRequestException('Username already in use');
    }

    if (emailAlreadyInUse) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        role: role,
      },
    });

    return { message: 'Registered successfully' };
  }

  async login() {
    return { message: 'Login successful' };
  }

  async logout() {
    return { message: 'Logout successful' };
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}

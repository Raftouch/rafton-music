import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
// import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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

  async login(authDto: LoginDto, req: Request, res: Response) {
    const { username, password } = authDto;

    const userFound = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!userFound) {
      throw new BadRequestException('Wrong credentials');
    }

    const passwordsMatch = this.comparePasswords({
      password,
      hash: userFound.password,
    });

    if (!passwordsMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      id: userFound.id,
      username: userFound.username,
    });

    if (!token) {
      throw new BadRequestException('Access denied, no token');
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
    });
    return res.send({ message: 'Login successful' });

    // const authEntity = new AuthEntity();
    // authEntity.token = token;
    // authEntity.message = 'Login successful';

    // return authEntity;
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logout successful' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; username: string }) {
    const payload = args;

    return this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET });
  }
}

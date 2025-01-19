import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/auth-register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(
    authDto: RegisterDto,
    req: Request,
    res: Response,
  ): Promise<AuthEntity> {
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

    const hashedPassword = await this.hashData(password);

    const newUser = await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        role: role,
      },
    });

    const tokens = await this.signTokens({
      id: newUser.id,
      username: newUser.username,
    });

    if (!tokens) {
      throw new BadRequestException('Access denied, no token');
    }

    await this.updateRefreshToken(newUser.id, tokens.refresh_token);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15 minutes
      // path: '/',
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // path: '/',
    });

    res.send({ message: 'Registration successful' });
    return tokens;
  }

  async login(
    authDto: LoginDto,
    req: Request,
    res: Response,
  ): Promise<AuthEntity> {
    const { username, password } = authDto;

    const userFound = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!userFound) {
      throw new BadRequestException('Wrong credentials');
    }

    const passwordsMatch = await this.comparePasswords({
      password,
      hash: userFound.password,
    });

    if (!passwordsMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const tokens = await this.signTokens({
      id: userFound.id,
      username: userFound.username,
    });

    if (!tokens) {
      throw new ForbiddenException('Access denied, no token');
    }

    await this.updateRefreshToken(userFound.id, tokens.refresh_token);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true, // Only accessible by the server
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15 minutes
      // path: '/',
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // path: '/',
    });

    const responsePayload: AuthEntity = {
      id: userFound.id,
      username: userFound.username,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };

    res.status(200).json(responsePayload);

    return responsePayload;
  }

  async logout(req: Request, res: Response, id: string) {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: null },
    });

    res.clearCookie('access_token', {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
    });

    return res.send({ message: 'Logout successful' });
  }

  async hashData(data: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(data, saltOrRounds);
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signTokens(args: {
    id: string;
    username: string;
  }): Promise<AuthEntity> {
    const payload = args;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: process.env.ACCESS_JWT_SECRET,
        expiresIn: 60 * 15,
      }), // 15 min
      this.jwt.signAsync(payload, {
        secret: process.env.REFRESH_JWT_SECRET,
        expiresIn: 60 * 60 * 24 * 7,
      }), // 1 week
    ]);

    return {
      id: payload.id,
      username: payload.username,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  async refreshToken(
    id: string,
    refreshToken: string,
    req: Request,
    res: Response,
  ) {
    const userFound = await this.prisma.user.findUnique({ where: { id } });

    if (!userFound) {
      throw new BadRequestException('Wrong credentials');
    }

    const tokensMatch = await bcrypt.compare(
      refreshToken,
      userFound.refreshToken,
    );

    if (!tokensMatch) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.signTokens({
      id: userFound.id,
      username: userFound.username,
    });

    if (!tokens) {
      throw new ForbiddenException('Access denied, no token');
    }

    await this.updateRefreshToken(userFound.id, tokens.refresh_token);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.send({ message: 'Refresh token successful' });
    return tokens;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // How the token is extracted
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_JWT_SECRET,
    });
    console.log('JWT Secret:', process.env.ACCESS_JWT_SECRET);
    console.log('AccessTokenStrategy initialized');
  }

  private static extractJWT(req: Request): string | null {
    console.log('Req COOKIES : ', req.cookies);
    if (
      req.cookies &&
      'access_token' in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      console.log('Access Token : ', req.cookies.access_token);
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: { id: string }) {
    console.log('AccessTokenStrategy - Payload:', payload); // Log the payload of the validated token

    const user = await this.usersService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}

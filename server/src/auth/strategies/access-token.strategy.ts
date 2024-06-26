import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // how i get a token
      secretOrKey: process.env.ACCESS_JWT_SECRET,
    });
  }

  // connected to signToken (auth.service)
  async validate(payload: { id: string }) {
    return payload;
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
// import { cookies } from 'next/headers';

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
      secretOrKey: process.env.ACCESS_JWT_SECRET, // Secret key for verifying the token
    });
    console.log('AccessTokenStrategy initialized'); // Log when the strategy is initialized
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

  // private static extractJWT(req: Request): string | null {
  //   // Log the entire cookies object to understand its structure
  //   console.log('Req COOKIES : ', req.cookies);

  //   // Retrieve and log the access token from cookies
  //   const token = req.cookies['access_token'];
  //   console.log('Access Token : ', token);

  //   return token || null;
  // }

  // Connected to signToken (auth.service)
  async validate(payload: { id: string }) {
    console.log('AccessTokenStrategy - Payload:', payload); // Log the payload of the validated token
    return payload; // Return the payload after validation
  }
}

// @Injectable()
// export class CookieAccessTokenStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-cookie',
// ) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (request: any) => {
//           const token = request?.cookies?.access_token;
//           console.log('COOKIES :', request.cookies);
//           console.log('Extracting JWT from cookie:', token); // Log when the token is extracted from the cookie
//           return token;
//         },
//       ]),
//       secretOrKey: process.env.ACCESS_JWT_SECRET, // Secret key for verifying the token
//     });
//     console.log('CookieAccessTokenStrategy initialized'); // Log when the strategy is initialized
//   }

//   // Validation method for the Access Token extracted from the cookie
//   async validate(payload: { id: string }) {
//     console.log('CookieAccessTokenStrategy - Payload:', payload); // Log the payload of the validated token
//     return payload; // Validate and return the payload
//   }
// }

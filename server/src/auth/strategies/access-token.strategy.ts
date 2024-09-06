import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      // Utilisation d'extracteurs personnalisés : Cookie ou Header
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractJWTFromCookie, // Extraction depuis les cookies
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraction depuis le header Authorization: Bearer
      ]),
      ignoreExpiration: false, // Vérifie que le token n'a pas expiré
      secretOrKey: process.env.ACCESS_JWT_SECRET, // Clé secrète pour vérifier le token
    });
    console.log('AccessTokenStrategy initialized'); // Log pour confirmer l'initialisation
  }

  private static extractJWTFromCookie(req: Request): string | null {
    console.log('Req COOKIES :', req.cookies); // Log des cookies
    if (req && req.cookies && 'access_token' in req.cookies) {
      console.log('Extracted Access Token from cookies:', req.cookies.access_token);
      return req.cookies.access_token; // Retourne le token
    }
    console.log('No token found in cookies'); // Log si aucun token trouvé
    return null;
  }


  // Méthode appelée pour valider le payload du JWT
  async validate(payload: { id: string }) {
    console.log('Validating Payload:', payload); // Log pour voir le payload
    const user = await this.usersService.findOne(payload.id); // Vérifie si l'utilisateur existe
    if (!user) {
      throw new UnauthorizedException('Invalid token or user not found'); // Renvoie une erreur si l'utilisateur n'existe pas
    }
    return user; // Retourne l'utilisateur validé, qui sera injecté dans `req.user`
  }
}

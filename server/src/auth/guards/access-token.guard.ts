import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        console.log('Request received:', request.method, request.url); // Log la méthode et l'URL de la requête

        const token = this.extractTokenFromRequest(request);
        console.log('Extracted token:', token); // Log le token extrait des headers ou des cookies

        if (!token) {
            console.log('No token found, throwing UnauthorizedException'); // Log si aucun token trouvé
            throw new UnauthorizedException('No token provided');
        }

        try {
            console.log('Verifying token...'); // Log avant la vérification du token
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.ACCESS_JWT_SECRET,
            });
            console.log('Token verified, payload:', payload); // Log si le token est vérifié avec succès

            request['user'] = payload; // Assigne le payload à la requête
            console.log('User set in request:', request['user']); // Log l'utilisateur ajouté à la requête
        } catch (error) {
            console.log('Token verification failed:', error.message); // Log si la vérification du token échoue
            throw new UnauthorizedException('Invalid token');
        }

        return true; // Retourne true si tout va bien
    }

    // Nouvelle méthode qui cherche le token dans les headers ou les cookies
    private extractTokenFromRequest(request: Request): string | undefined {
        // Cherche le token dans les headers
        console.log('Authorization header:', request.headers.authorization);
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if (type === 'Bearer' && token) {
            console.log('Token extracted from Authorization header:', token);
            return token; // Retourne le token extrait des headers
        }

        // Cherche le token dans les cookies HttpOnly
        console.log('Cookies:', request.cookies);
        const cookieToken = request.cookies?.access_token; // Récupère le token depuis les cookies
        if (cookieToken) {
            console.log('Token extracted from cookies:', cookieToken);
            return cookieToken; // Retourne le token extrait des cookies
        }

        console.log('No token found in headers or cookies'); // Log si aucun token trouvé
        return undefined;
    }
}

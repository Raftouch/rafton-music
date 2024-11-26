import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
// import { Observable } from 'rxjs';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
    //     if synchronous role check --> no need for Observable
  ): boolean {
    // ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // user will be attached from the AccessTokenStrategy

    if (!user || user.role !== 'ADMIN') {
      throw new UnauthorizedException('Access denied. Admins only');
    }

    return true;
  }
}

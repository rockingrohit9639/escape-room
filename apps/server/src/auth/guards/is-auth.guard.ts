import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IsAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest() as Request;
    const isAuthenticated = request.isAuthenticated();
    return isAuthenticated;
  }
}

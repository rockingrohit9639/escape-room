import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGuard('email') {
  constructor() {
    super();
  }

  async canActivate(ctx: ExecutionContext) {
    const result = (await super.canActivate(ctx)) as boolean;
    await super.logIn(ctx.switchToHttp().getRequest());
    return result;
  }
}

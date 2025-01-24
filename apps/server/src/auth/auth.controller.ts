import { authContract } from '@escape-room/contracts';
import { Controller, Req, UseGuards } from '@nestjs/common';
import { nestControllerContract, TsRest, TsRestRequest } from '@ts-rest/nest';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthRequestShapes, AuthResponseShapes } from './auth.types';
import { Request } from 'express';

const c = nestControllerContract(authContract);

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @TsRest(c.login)
  async login(): Promise<AuthResponseShapes['login']> {
    return this.authService.login();
  }

  @TsRest(c.signup)
  async signup(
    @TsRestRequest() { body }: AuthRequestShapes['signup'],
    @Req() request: Request
  ) {
    return this.authService.signup(body, request);
  }
}

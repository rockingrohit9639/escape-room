import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { userContract } from '@escape-room/contracts';
import { UserResponseShapes } from './user.types';
import { User } from './user.decorator';
import { IsAuthGuard } from '../auth/guards/is-auth.guard';
import { SessionUser } from '../auth/auth.types';

const c = nestControllerContract(userContract);

@UseGuards(IsAuthGuard)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TsRest(c.me)
  async me(@User() user: SessionUser): Promise<UserResponseShapes['me']> {
    return this.userService.me(user);
  }
}

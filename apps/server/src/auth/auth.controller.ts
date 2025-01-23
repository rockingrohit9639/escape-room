import { authContract } from '@escape-room/contracts';
import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestResponseShapes,
  TsRest,
} from '@ts-rest/nest';

const c = nestControllerContract(authContract);
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class AuthController {
  @TsRest(c.test)
  test(): ResponseShapes['test'] {
    console.log('This is test');
    return {
      status: 200,
      body: { success: true },
    };
  }
}

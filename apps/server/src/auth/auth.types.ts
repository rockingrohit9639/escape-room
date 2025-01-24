import { authContract } from '@escape-room/contracts';
import { NestRequestShapes, NestResponseShapes } from '@ts-rest/nest';

export type SessionUser = {
  id: string;
  email: string;
};

export type AuthResponseShapes = NestResponseShapes<typeof authContract>;
export type AuthRequestShapes = NestRequestShapes<typeof authContract>;

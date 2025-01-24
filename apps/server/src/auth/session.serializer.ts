import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: unknown,
    done: (err: Error | null, user: unknown) => void
  ) {
    done(null, user);
  }

  deserializeUser(
    payload: string,
    done: (err: Error | null, payload: string) => void
  ) {
    done(null, payload);
  }
}

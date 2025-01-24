import { HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { SessionUser } from '../auth/auth.types'
import { UserResponseShapes } from './user.types'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async me(user: SessionUser): Promise<UserResponseShapes['me']> {
    const userFound = await this.prisma.user.findUnique({
      where: { id: user.id, email: user.email },
      omit: { password: true, salt: true },
    })

    return {
      status: HttpStatus.OK,
      body: userFound,
    }
  }
}

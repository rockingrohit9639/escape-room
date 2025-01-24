import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AuthRequestShapes, AuthResponseShapes } from './auth.types'
import * as bcrypt from 'bcrypt'
import { Request } from 'express'
import { promisify } from '../lib/promisify'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        salt: true,
        password: true,
      },
    })

    if (!user) {
      throw new BadRequestException('Invalid credentials.')
    }

    const hashedPassowrd = await bcrypt.hash(password, user.salt)
    if (hashedPassowrd !== user.password) {
      throw new BadRequestException('Invalid credentials.')
    }

    return {
      id: user.id,
      email: user.email,
    }
  }

  async login(): Promise<AuthResponseShapes['login']> {
    return { status: HttpStatus.OK, body: { success: true } }
  }

  async signup(body: AuthRequestShapes['signup']['body'], request: Request): Promise<AuthResponseShapes['signup']> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: body.email },
    })
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.')
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(body.password, salt)

    const user = await this.prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
        salt,
      },
      omit: { password: true, salt: true },
    })

    await promisify<void>((callback) => request.logIn(user, { session: true }, callback))

    return { status: HttpStatus.CREATED, body: { user } }
  }
}

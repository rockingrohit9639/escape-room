import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let errors: unknown

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      errors = exception.getResponse()
    }

    response.status(status).json({
      message: exception.message,
      errors,
    })
  }
}

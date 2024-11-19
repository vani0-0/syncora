import type { HttpExceptionOptions } from './http.exception'
import { HttpStatusCode } from 'axios'
import { HttpException } from './http.exception'

export class InternalServerErrorException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions: string | HttpExceptionOptions = 'Internal Server Error',
  ) {
    const { description, httpExceptionOptions } = HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions)
    super(HttpException.createBody(objectOrError, description ?? '', HttpStatusCode.InternalServerError), HttpStatusCode.InternalServerError, httpExceptionOptions)
  }
}

import type { HttpExceptionOptions } from './http.exception'
import { HttpStatusCode } from 'axios'
import { HttpException } from './http.exception'

export class NotFoundException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions: string | HttpExceptionOptions = 'Not Found',
  ) {
    const { description, httpExceptionOptions } = HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions)
    super(HttpException.createBody(objectOrError, description ?? '', HttpStatusCode.NotFound), HttpStatusCode.NotFound, httpExceptionOptions)
  }
}

import type { HttpExceptionOptions } from './http.exception'
import { HttpStatusCode } from 'axios'
import { HttpException } from './http.exception'

export class NotImplementedException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions: string | HttpExceptionOptions = 'Not Implemented',
  ) {
    const { description, httpExceptionOptions } = HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions)
    super(HttpException.createBody(objectOrError, description ?? '', HttpStatusCode.NotImplemented), HttpStatusCode.NotImplemented, httpExceptionOptions)
  }
}

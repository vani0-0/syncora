import type { HttpExceptionOptions } from './http.exception'
import { HttpStatusCode } from 'axios'
import { HttpException } from './http.exception'

export class HttpVersionNotSupportedException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions: string | HttpExceptionOptions = 'Http Version Not Supported',
  ) {
    const { description, httpExceptionOptions } = HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions)
    super(HttpException.createBody(objectOrError, description ?? '', HttpStatusCode.HttpVersionNotSupported), HttpStatusCode.HttpVersionNotSupported, httpExceptionOptions)
  }
}

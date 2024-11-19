import type { HttpExceptionOptions } from './http.exception'
import { HttpStatusCode } from 'axios'
import { HttpException } from './http.exception'

export class PayloadTooLargeException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions: string | HttpExceptionOptions = 'Payload Too Large',
  ) {
    const { description, httpExceptionOptions } = HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions)
    super(HttpException.createBody(objectOrError, description ?? '', HttpStatusCode.PayloadTooLarge), HttpStatusCode.PayloadTooLarge, httpExceptionOptions)
  }
}

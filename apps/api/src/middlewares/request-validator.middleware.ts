import type { NextFunction, Request, Response } from '@/common/types/express-types'
import { BadRequestException } from '@syncora/exceptions'
import { type ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

class RequestValidator {
  static validate = <T>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
      try {
        const convertedObject = plainToInstance(classInstance, req.body)
        const errors = await validate(
          convertedObject as Record<string, unknown>,
        )
        if (errors.length === 0) {
          next()
          return
        }
        const rawErrors: string[] = [
          ...new Set([
            ...errors.flatMap(error =>
              Object.values(error.constraints ?? []),
            ),
          ]),
        ]
        next(new BadRequestException(rawErrors.join(', ')))
      }
      catch (e: any) {
        next(new BadRequestException(e.message))
      }
    }
  }
}

export default RequestValidator

import type { IExpressApplication } from '@/common'
import type { ExpressRouter, HttpAdapter, HttpServer } from '@/common/types/express-types'
import type { CorsOptions, CorsOptionsDelegate } from 'cors'

import { createServer } from 'node:http'
import process from 'node:process'
import { errorHandler, missingRouteHandler } from '@/middlewares'
import { loadPackage } from '@/utils'
import { Logger } from '@syncora/logger'
import { isFunction } from '@syncora/utils/shared'
import passport from 'passport'
import { type ApplicationConfig, swaggerSpec } from '../config'
import { MESSAGES } from '../constants'
import '@/network/strategies'

export class ExpressApplication implements IExpressApplication {
  protected readonly logger = new Logger(ExpressApplication.name, { timestamp: true })
  protected readonly httpServer: HttpServer
  protected isInitialized = false

  constructor(
    protected readonly httpAdapter: HttpAdapter,
    protected readonly config: ApplicationConfig,
    protected readonly routes: ExpressRouter,
  ) {
    this.httpServer = createServer(httpAdapter)
  }

  async init(): Promise<this> {
    if (this.isInitialized) {
      return this
    }

    const express = await loadPackage('express')
    const helmet = await loadPackage('helmet')
    const nocache = await loadPackage('nocache')
    const cookieParser = await loadPackage('cookie-parser')

    // ** Apply default middlewares here.
    this.httpAdapter.use(helmet())
    this.httpAdapter.use(nocache())
    this.httpAdapter.use(express.json())
    this.httpAdapter.disable('x-powered-by')
    this.httpAdapter.use(express.urlencoded({ extended: true }))
    this.httpAdapter.use(cookieParser())
    this.httpAdapter.set('trust proxy', 1)

    await this.registerPassport()
    await this.registerRouter()
    await this.registerSwagger()

    this.httpAdapter.use(missingRouteHandler())
    this.httpAdapter.use(errorHandler())

    this.isInitialized = true
    this.logger.log(MESSAGES.APPLICATION_READY)
    return this
  }

  use(...args: any[]): this {
    this.httpAdapter.use(...args)
    return this
  }

  set(setting: string, val: any): this {
    this.httpAdapter.set(setting, val)
    return this
  }

  async enableCors(options?: CorsOptions | CorsOptionsDelegate<any>): Promise<void> {
    const cors = await loadPackage('cors')
    this.httpAdapter.use(cors(options))
  }

  async listen(port: number | string, listeningListener?: () => void): Promise<any>
  async listen(port: number | string, hostname: string, listeningListener?: () => void): Promise<any>
  async listen(port: unknown, ...args: any[]): Promise<any> {
    !this.isInitialized && (await this.init())

    return new Promise((resolve, reject) => {
      const errorHandler = (error: any) => {
        if (error.code === 'EADDRINUSE') {
          this.logger.error(`Port ${port} is already in use.`)
        }
        else {
          this.logger.error(`An error occured while starting server: ${error.message}`)
        }
        reject(error)
      }
      this.httpServer.once('error', errorHandler)

      const isCallbackInOriginalArgs = isFunction(args[args.length - 1])
      const listenFuncArgs = isCallbackInOriginalArgs ? args.slice(0, args.length - 1) : args

      this.httpServer.listen(port, ...listenFuncArgs, (...originalCallbackArgs: unknown[]) => {
        if (originalCallbackArgs[0] instanceof Error) {
          this.httpServer.removeListener('error', errorHandler)
          return reject(originalCallbackArgs[0])
        }

        const address = this.httpServer.address()
        if (address) {
          this.httpServer.removeListener('error', errorHandler)
          resolve(this.httpServer)
        }

        if (isCallbackInOriginalArgs) {
          args[args.length - 1](...originalCallbackArgs)
        }
      })
    })
  }

  private async registerPassport() {
    this.httpAdapter.use(passport.initialize())
  }

  private async registerRouter() {
    const basePath = this.config.getGlobalPrefix()
    const version = this.config.getVersion()
    this.httpAdapter.use(`${basePath}${version}`, this.routes)
  }

  private async registerSwagger() {
    const { serve, setup } = await loadPackage('swagger-ui-express')
    const docsPath = this.config.getDocsPath()
    const basePath = this.config.getGlobalPrefix()
    const version = this.config.getVersion()
    const modifySwaggerSpec = {
      ...swaggerSpec,
      servers: [
        {
          url: `${basePath}${version}`,
          desciption: 'Syncora Server',
        },
      ],
    }

    this.httpAdapter.use(docsPath, serve, setup(modifySwaggerSpec, {
      customSiteTitle: 'Syncora Docs',
      swaggerOptions: {
        docExpansion: 'none',
        displayRequestDuration: true,
        filter: true,
        operationsSorter: 'alpha',
        tagsSorter: 'alpha',
        tryItOutEnabled: true,
      },
    }))
  }
}

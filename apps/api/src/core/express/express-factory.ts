import type { IExpressApplication } from '@/common'
import type { ExpressRouter, HttpAdapter } from '@/common/types/express-types'

import { loadPackage } from '@/utils'
import { Logger } from '@syncora/logger'
import { ApplicationConfig } from '../config'
import { MESSAGES } from '../constants'
import { ExpressApplication } from './express-application'

class ExpressFactoryStatic {
  private readonly logger = new Logger('ExpressFactory', { timestamp: true })

  public async create(
    routes: ExpressRouter,
  ): Promise<IExpressApplication> {
    const httpServer = await this.createHttpAdapter()

    this.logger.log(MESSAGES.APPLICATION_START)
    const applicationConfig = new ApplicationConfig()
    return new ExpressApplication(httpServer, applicationConfig, routes)
  }

  private async createHttpAdapter(): Promise<HttpAdapter> {
    // const express = await loadPackage<typeof import('express')>('express', () => require('express'))
    const express = await loadPackage('express')
    return express() as HttpAdapter
  }
}

export const ExpressFactory = new ExpressFactoryStatic()

import process from 'node:process'
import { Environments } from '@/common'
import { Logger } from '@syncora/logger'

const logger = new Logger('AppInfo', { timestamp: true })

export function printAppInfo(cpuCount: number = 1, workerCount: number = 1, processId: number | string = 'Unknown', customMessage: string = '', customMessage2: string = ''): void {
  const env = process.env.NODE_ENV || Environments.DEV
  const port = process.env.BACKEND_PORT || 'Not set'
  const appUrl = process.env.FRONTEND_BASE_URL || 'Not set'
  const apiUrl = process.env.BACKEND_BASE_URL || 'Not set'
  const redisUrl = process.env.REDIS_URL || 'Not set'
  const dbUrl = process.env.DATABASE_URL || 'Not set'

  logger.log('--------------------------------------------------------------')
  logger.log('Server is running successfully...')
  logger.debug?.(`Environment: ${env}`)
  logger.debug?.(`Port: ${port}`)
  logger.debug?.(`Server: ${apiUrl}`)
  logger.debug?.(`Client: ${appUrl}`)
  logger.debug?.(`Redis: ${redisUrl}`)
  logger.debug?.(`Database URL: ${dbUrl}`)
  logger.log(`Process ID ${processId}`)
  logger.log(`CPU Count: ${cpuCount}`)
  logger.log(`Worker Count: ${workerCount}`)
  logger.log(customMessage)
  logger.log(customMessage2)
  logger.log('--------------------------------------------------------------')
}

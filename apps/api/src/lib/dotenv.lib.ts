import process from 'node:process'
import { EnvironmentFile, Environments } from '@/common'
import { loadEnvFile } from '@/utils'
import { Logger } from '@syncora/logger'

const logger = new Logger('EnvValidator', { timestamp: true })

if (process.env.NODE_ENV === Environments.DEV) {
  loadEnvFile(EnvironmentFile.DEV, logger)
}

else if (process.env.NODE_ENV === Environments.PROD) {
  loadEnvFile(EnvironmentFile.PROD, logger)
}

else {
  loadEnvFile(EnvironmentFile.DEFAULT, logger)
}

function validateEnv() {
  const requiredVariables = [
    'BACKEND_PORT',
    'FRONTEND_BASE_URL',
    'BACKEND_BASE_URL',
    'DATABASE_URL',
    'COOKIE_SECRET',
    'JWT_ACCESS_TOKEN_SECRET',
    'JWT_REFRESH_TOKEN_SECRET',
  ]
  const missingVariables = requiredVariables.filter(variable => !process.env[variable])
  if (missingVariables.length > 0) {
    logger.fatal?.(`Missing required environment variables ${missingVariables.join(', ')}`)
    process.exit(1)
  }

  if (Number.isNaN(process.env.BACKEND_PORT)) {
    logger.fatal?.('BACKEND_PORT must be a number')
    process.exit(1)
  }
  logger.verbose?.('environment variables are ready.')
}

validateEnv()

import process from 'node:process'
import { Logger } from '@syncora/logger'

const logger = new Logger('Shutdown', { timestamp: true })

export async function shutdown() {
  logger.log(`Worker ${process.pid} shutting down gracefully...`)
  try {
    process.exit(0)
  }
  catch (error) {
    logger.error(`Worker ${process.pid} error during shutdown`, error)
    process.exit(1)
  }
}

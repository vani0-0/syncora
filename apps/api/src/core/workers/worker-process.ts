import process from 'node:process'
import { bootstrap } from '@/main'
import { Shutdown } from '@/utils'
import { Logger } from '@syncora/logger'

function WorkerProcess(cpuCount: number): void {
  const server = bootstrap(process, cpuCount)
  server()

  process.on('SIGTERM', Shutdown)
  process.on('SIGINT', Shutdown)

  process.on('uncaughtException', (error) => {
    Logger.error(`Worker ${process.pid} uncaught exception`, error)
    Shutdown()
  })
}

export default WorkerProcess

import type { EnvironmentFile } from '@/common'
import type { Logger } from '@syncora/logger'

import { existsSync } from 'node:fs'
import { config } from 'dotenv'

export function loadEnvFile(fileName: EnvironmentFile, logger?: Logger) {
  if (existsSync(fileName)) {
    config({ path: fileName })
    logger?.log(`Loaded environment variables from ${fileName}`)
  }
  else {
    logger?.error(`Environment file not found: ${fileName}`)
  }
}

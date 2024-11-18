import type { Environments } from '@/common/enums'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: Environments
      BACKEND_PORT: string
      FRONTEND_BASE_URL: string
      BACKEND_BASE_URL: string
      DATABASE_URL: string
      REDIS_URL: string
    }
  }
}

export { }

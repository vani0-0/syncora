import type { Environments } from '@/common/enums/environment.enum'

export type CommonEnvKeys = keyof typeof Environments
export type EnvFileKeys = CommonEnvKeys | 'DEFAULT'

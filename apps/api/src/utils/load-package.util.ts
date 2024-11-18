import process from 'node:process'
import { Logger } from '@syncora/logger'
import { isFunction } from '@syncora/utils/shared'

function MISSING_REQUIRED_DEPENDENCY(name: string) {
  return `The "${name}" package is missing. Please, make sure to install \`pnpm install ${name}\`.`
}

export async function loadPackage<T = any>(
  packageName: string,
  loaderFn?: () => Promise<T>,
): Promise<T> {
  try {
    if (isFunction(loaderFn)) {
      return await loaderFn()
    }

    return (await import(packageName)).default
  }
  catch {
    Logger.error(MISSING_REQUIRED_DEPENDENCY(packageName))
    Logger.flush()
    process.exit(1)
  }
}

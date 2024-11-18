import { addLeadingSlash, isNil, isString, normalizePath } from '@syncora/utils/shared'

export class ApplicationConfig {
  constructor(
    protected globalPrefix: string = 'api',
    protected version: string = 'v1',
    protected docsPath = 'docs',
  ) { }

  /**
   * Normalizes paths using utility functions.
   * Ensures paths are not nil and have a leading slash.
   */
  normalizeConfigPath(path: string): string {
    if (isNil(path) || !isString(path)) {
      throw new Error('Invalid path. A path must be a non-empty string')
    }
    return normalizePath(addLeadingSlash(path))
  }

  getGlobalPrefix(): string {
    return this.normalizeConfigPath(this.globalPrefix)
  }

  getVersion(): string {
    return this.normalizeConfigPath(this.version)
  }

  getDocsPath(): string {
    return this.normalizeConfigPath(this.docsPath)
  }
}

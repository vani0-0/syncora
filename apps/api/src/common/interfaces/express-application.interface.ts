import type { CorsOptions, CorsOptionsDelegate } from 'cors'

export interface IExpressApplication {
  /**
   * A wrapper function around HTTP adapter method: `adapter.use()`.
   * This allows adding middleware or routes to the Express application.
   * Example usage: `app.use(cors())`
   *
   * @param args - Arguments passed to the `use` method (could be middleware or routes)
   * @returns {this} The application instance for method chaining.
   */
  use(...args: any[]): this

  /**
   * A wrapper function for configuring application settings.
   * Example: `app.set('view engine', 'ejs')`
   *
   * @param setting - The name of the setting (e.g., `'view engine'`, `'env'`, etc.).
   * @param val - The value to set for the setting.
   * @returns {this} The application instance for method chaining.
   */
  set(setting: string, val: any): this

  /**
   * Initializes the application.
   * It isn't mandatory to call this method directly.
   *
   * @returns {Promise<this>} The ApplicationContext instance as Promise
   */
  init(): Promise<this>

  /**
   * Enables Cross-Origin Resource Sharing (CORS) for the application.
   * CORS allows you to define which domains can interact with the application via HTTP.
   *
   * Example usage:
   * `app.enableCors({ origin: 'https://example.com' })`
   *
   * @param options - Options or a delegate function to configure CORS.
   * @returns {void}
   */
  enableCors(options?: CorsOptions | CorsOptionsDelegate<any>): Promise<void>

  /**
   * Starts the Express application with a specified hostname and port.
   *
   * @param port - The port to listen on (can be a number or a string).
   * @param hostname - The hostname to bind the server to.
   * @param listeningListener - Optional callback to run when the server starts listening.
   * @returns {Promise<any>} A Promise that resolves to the underlying HttpServer.
   */
  listen(port: number | string, listeningListener?: () => void): Promise<any>
  listen(port: number | string, hostname: string, listeningListener?: () => void): Promise<any>
}

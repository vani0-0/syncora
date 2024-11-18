export interface ContextMessages {
  messages: unknown[]
  context?: string
}

export interface ContextStackMessages extends ContextMessages {
  stack?: string
}

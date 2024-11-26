import 'express-session'

declare global {
  namespace Express {
    interface Request {
      session: Session & Partial<SessionData>
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    user: any
    // TODO: Custom properties to be added
  }
}

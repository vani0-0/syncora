import type { Express, NextFunction as ExpressNextFunction, Request as ExpressRequest, Response as ExpressResponse, RequestHandler, Router } from 'express'
import type { Server } from 'node:http'

export type Request = ExpressRequest
export type Response = ExpressResponse
export type NextFunction = ExpressNextFunction
export type ExpressRouter = Router
export type HttpAdapter = Express
export type HttpServer = Server
export type ExpressHandler = RequestHandler

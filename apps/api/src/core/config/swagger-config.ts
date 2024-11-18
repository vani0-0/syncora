import type { Options, SwaggerDefinition } from 'swagger-jsdoc'
import path from 'node:path'
import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Syncora',
    version: '1.0.0',
    description: 'API documentation for the Syncora application.',
  },
}
const options: Options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../../docs/*.yaml')],
}

const swaggerSpec = swaggerJSDoc(options)

export { swaggerSpec }

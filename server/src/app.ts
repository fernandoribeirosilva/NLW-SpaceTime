import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { memoriesRoutes } from './http/routes/memories'

import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(memoriesRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
    console.error('ERROR')
  } else {
    // TODO Here wa should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
